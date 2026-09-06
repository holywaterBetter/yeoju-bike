import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.LAYOUT_BASE_URL || process.env.RESPONSIVE_BASE_URL || "http://127.0.0.1:3000";

const pages = [
  { route: "/", key: "landing", referenceHeights: { 1440: 5440, 402: 4107 } },
  { route: "/courses/", key: "courses", referenceHeights: { 1440: 5247, 402: 3828 } },
  { route: "/reservation/", key: "directions", referenceHeights: { 1440: 2602, 402: 1883 } },
];

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 402, height: 874 },
  { width: 430, height: 932 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1366, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
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
  for (const failure of failures) console.error(`[fail] ${failure}`);
  process.exit(1);
}

console.log("[pass] layout checks passed at 360/390/402/430/768/1024/1366/1440/1920px");

async function checkPage(pageSpec, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const label = `${pageSpec.key} ${viewport.width}x${viewport.height}`;

  try {
    await page.goto(new URL(pageSpec.route, baseUrl).toString(), { waitUntil: "networkidle" });
    await loadRenderedImages(page);

    const result = await page.evaluate(() => {
      const isVisible = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      };

      return {
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        hasMain: Boolean(document.querySelector("[data-responsive-page] main")),
        footerCount: document.querySelectorAll("[data-contact-footer]").length,
        footerLogoCount: document.querySelectorAll('[data-contact-footer] img[alt="여주시"], [data-contact-footer] img[alt="여주세종문화관광재단"]').length,
        brokenImages: Array.from(document.images)
          .filter(isVisible)
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.getAttribute("src")),
        forbiddenRuntimeImages: Array.from(document.images)
          .map((image) => image.currentSrc || image.src)
          .filter((src) => src.includes("/assets/figma/reference/") || src.includes("/assets/figma/crops/")),
        smallControls: Array.from(document.querySelectorAll("a[href], button"))
          .filter(isVisible)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: element.textContent?.trim() || element.getAttribute("aria-label") || element.tagName,
              width: rect.width,
              height: rect.height,
            };
          })
          .filter((control) => control.width < 44 || control.height < 44),
      };
    });

    const overflow = Math.max(result.scrollWidth, result.bodyScrollWidth) - viewport.width;
    if (overflow > 1) failures.push(`${label}: horizontal overflow ${overflow}px`);
    if (!result.hasMain) failures.push(`${label}: missing semantic main`);
    if (result.footerCount !== 1) failures.push(`${label}: expected one shared footer, found ${result.footerCount}`);
    if (result.footerLogoCount !== 2) failures.push(`${label}: expected two official footer logos, found ${result.footerLogoCount}`);
    if (result.brokenImages.length) failures.push(`${label}: broken images ${result.brokenImages.join(", ")}`);
    if (result.forbiddenRuntimeImages.length) failures.push(`${label}: reference/crop image rendered at runtime`);

    if (viewport.width < 768 && result.smallControls.length) {
      failures.push(
        `${label}: controls smaller than 44px — ${result.smallControls.map((control) => `${control.label} ${control.width.toFixed(1)}x${control.height.toFixed(1)}`).join(", ")}`,
      );
    }

    const expectedHeight = pageSpec.referenceHeights[viewport.width];
    if (expectedHeight && Math.abs(result.scrollHeight - expectedHeight) > 4) {
      failures.push(`${label}: height ${result.scrollHeight}px differs from reference ${expectedHeight}px`);
    }
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
      await wait(50);
    }

    window.scrollTo(0, 0);
    if ("fonts" in document) await document.fonts.ready;
  });

  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => {
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      const rendered = rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
      return !rendered || (image.complete && image.naturalWidth > 0);
    }),
  );
}
