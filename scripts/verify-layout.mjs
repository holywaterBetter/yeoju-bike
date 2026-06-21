import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.LAYOUT_BASE_URL || process.env.RESPONSIVE_BASE_URL || "http://127.0.0.1:3000";

const pages = [
  { route: "/", key: "landing", designWidth: 1440 },
  { route: "/courses", key: "courses", designWidth: 1440 },
  { route: "/reservation", key: "reservation", designWidth: 1440 },
];

const viewports = [
  { key: "pc", width: 1440, height: 900 },
  { key: "tablet", width: 1024, height: 768 },
  { key: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
const failures = [];

try {
  for (const pageSpec of pages) {
    for (const viewport of viewports) {
      await checkPage(pageSpec, viewport);
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`[fail] ${failure}`);
  }
  process.exit(1);
}

console.log("[pass] layout checks passed");

async function checkPage(pageSpec, viewport) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(new URL(pageSpec.route, baseUrl).toString(), { waitUntil: "networkidle" });
    await loadRenderedImages(page);
    await page.evaluate(async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    });

    const result = await page.evaluate(
      ({ pageSpec, viewport }) => {
        const main = document.querySelector("main[data-node-id]");
        const surface = document.querySelector("[data-responsive-page]");
        const mainRect = main?.getBoundingClientRect();
        const surfaceRect = surface?.getBoundingClientRect();
        const runtimeReferenceImages = Array.from(document.images)
          .map((image) => image.currentSrc || image.src)
          .filter((src) => src.includes("/assets/figma/reference/"));
        const runtimeCropImages = Array.from(document.images)
          .map((image) => image.currentSrc || image.src)
          .filter((src) => src.includes("/assets/figma/crops/"));
        const isRenderedImage = (image) => {
          const rect = image.getBoundingClientRect();
          const style = getComputedStyle(image);

          return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.display !== "none" &&
            style.visibility !== "hidden"
          );
        };
        const brokenImages = Array.from(document.images)
          .filter(isRenderedImage)
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"));
        const visibleLinks = Array.from(document.querySelectorAll("a[href]"))
          .map((link) => {
            const rect = link.getBoundingClientRect();
            const style = getComputedStyle(link);

            return {
              href: link.getAttribute("href") || "",
              text: link.textContent?.trim() || link.getAttribute("aria-label") || "",
              width: rect.width,
              height: rect.height,
              visible:
                rect.width > 0 &&
                rect.height > 0 &&
                style.display !== "none" &&
                style.visibility !== "hidden",
            };
          })
          .filter((link) => link.visible);
        const mobileCtas = visibleLinks.filter(
          (link) => /예약|문의|카카오톡/.test(link.text) || /form\.naver|pf\.kakao/.test(link.href),
        );

        return {
          key: pageSpec.key,
          viewport,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          mainRect,
          surfaceRect,
          runtimeReferenceImages,
          runtimeCropImages,
          brokenImages,
          mobileCtas,
          hasVisibleTitle: Boolean(
            Array.from(document.querySelectorAll("h1, h2")).some((heading) => {
              const rect = heading.getBoundingClientRect();
              const style = getComputedStyle(heading);

              return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
            }),
          ),
        };
      },
      { pageSpec, viewport },
    );

    validate(result, pageSpec, viewport);
  } finally {
    await page.close();
  }
}

async function loadRenderedImages(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.max(320, Math.floor(window.innerHeight * 0.8));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    for (let y = 0; y <= maxScroll; y += step) {
      window.scrollTo(0, y);
      await wait(80);
    }

    window.scrollTo(0, 0);
  });

  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => {
      const rect = image.getBoundingClientRect();
      const style = window.getComputedStyle(image);
      const isRendered =
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== "none" &&
        style.visibility !== "hidden";

      return !isRendered || (image.complete && image.naturalWidth > 0);
    }),
  );
}

function validate(result, pageSpec, viewport) {
  const label = `${pageSpec.key} ${viewport.key} ${viewport.width}x${viewport.height}`;
  const overflow = Math.max(result.scrollWidth, result.bodyScrollWidth) - viewport.width;

  if (overflow > 1) {
    failures.push(`${label}: horizontal overflow ${overflow}px`);
  }

  if (result.brokenImages.length > 0) {
    failures.push(`${label}: broken images ${result.brokenImages.join(", ")}`);
  }

  if (result.runtimeReferenceImages.length > 0) {
    failures.push(`${label}: runtime reference images ${result.runtimeReferenceImages.join(", ")}`);
  }

  if (result.runtimeCropImages.length > 0) {
    failures.push(`${label}: runtime crop images ${result.runtimeCropImages.join(", ")}`);
  }

  if (!result.mainRect || !result.surfaceRect) {
    failures.push(`${label}: missing main or responsive surface`);
    return;
  }

  if (Math.abs(result.mainRect.width - viewport.width) > 1.5) {
    failures.push(`${label}: main width ${result.mainRect.width.toFixed(2)} expected ${viewport.width}`);
  }

  if (viewport.width >= 768) {
    const expectedLeft = 0;
    const leftDelta = Math.abs(result.mainRect.left - expectedLeft);

    if (leftDelta > 1.5) {
      failures.push(`${label}: main left ${result.mainRect.left.toFixed(2)} expected ${expectedLeft}`);
    }
  }

  if (viewport.width < 768) {
    if (!result.hasVisibleTitle) {
      failures.push(`${label}: no visible mobile heading`);
    }

    for (const cta of result.mobileCtas) {
      if (cta.height < 44 || cta.width < 44) {
        failures.push(`${label}: small CTA/link ${cta.text || cta.href} ${cta.width.toFixed(1)}x${cta.height.toFixed(1)}`);
      }
    }
  }
}
