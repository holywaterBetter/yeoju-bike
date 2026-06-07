import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.RESPONSIVE_BASE_URL || "http://127.0.0.1:3000";

const pages = [
  { route: "/", key: "landing", designWidth: 1440, designHeight: 5693 },
  { route: "/courses", key: "courses", designWidth: 1440, designHeight: 8472 },
  { route: "/reservation", key: "reservation", designWidth: 1440, designHeight: 2415 }
];

const desktopViewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 2100, height: 1100 },
  { width: 2560, height: 1440 }
];

const mobileViewports = [
  { width: 360, height: 640 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 }
];

const browser = await chromium.launch();
const failures = [];

try {
  for (const pageSpec of pages) {
    for (const viewport of desktopViewports) {
      await checkPage(pageSpec, viewport, "desktop");
    }

    for (const viewport of mobileViewports) {
      await checkPage(pageSpec, viewport, "mobile");
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

console.log("[pass] responsive viewport checks passed");

async function checkPage(pageSpec, viewport, mode) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

  try {
    await page.goto(`${baseUrl}${pageSpec.route}`, { waitUntil: "networkidle" });
    await page.waitForFunction(() =>
      Array.from(document.images).every((image) => image.complete)
    );

    const result = await page.evaluate(
      ({ mode, pageSpec }) => {
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
        const brokenImages = Array.from(document.images)
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.getAttribute("src"));
        const links = Array.from(document.querySelectorAll("a[href]")).map((link) => {
          const rect = link.getBoundingClientRect();
          const style = getComputedStyle(link);
          return {
            href: link.getAttribute("href"),
            text: link.textContent?.trim() || link.getAttribute("aria-label") || "",
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            visible: rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden"
          };
        }).filter((link) => link.visible);
        const ctas = links.filter((link) =>
          link.href === "/reservation" ||
          link.href === "#" ||
          /예약|문의/.test(link.text)
        );

        return {
          mode,
          path: location.pathname,
          viewport: { width: innerWidth, height: innerHeight },
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
          mainRect,
          surfaceRect,
          runtimeReferenceImages,
          runtimeCropImages,
          brokenImages,
          links,
          ctas,
          hasVisibleTitle: Boolean(
            Array.from(document.querySelectorAll("h1, h2")).some((heading) => {
              const rect = heading.getBoundingClientRect();
              const style = getComputedStyle(heading);
              return rect.width > 0 && rect.height > 0 && style.display !== "none";
            })
          ),
          pageSpec
        };
      },
      { mode, pageSpec }
    );

    validate(result, pageSpec, viewport, mode);
  } finally {
    await page.close();
  }
}

function validate(result, pageSpec, viewport, mode) {
  const label = `${pageSpec.key} ${mode} ${viewport.width}x${viewport.height}`;
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

  if (mode === "desktop") {
    const expectedWidth = Math.min(viewport.width, pageSpec.designWidth);
    const expectedLeft = (viewport.width - expectedWidth) / 2;
    const widthDelta = Math.abs(result.mainRect.width - expectedWidth);
    const leftDelta = Math.abs(result.mainRect.left - expectedLeft);

    if (widthDelta > 1.5) {
      failures.push(`${label}: main width ${result.mainRect.width.toFixed(2)} expected ${expectedWidth}`);
    }

    if (leftDelta > 1.5) {
      failures.push(`${label}: main left ${result.mainRect.left.toFixed(2)} expected ${expectedLeft}`);
    }

  } else {
    if (Math.abs(result.mainRect.width - viewport.width) > 1.5) {
      failures.push(`${label}: mobile main width ${result.mainRect.width.toFixed(2)}`);
    }

    if (!result.hasVisibleTitle) {
      failures.push(`${label}: no visible mobile heading`);
    }

    for (const cta of result.ctas) {
      if (cta.height < 44 || cta.width < 44) {
        failures.push(`${label}: small CTA/link ${cta.text || cta.href} ${cta.width.toFixed(1)}x${cta.height.toFixed(1)}`);
      }
    }
  }
}
