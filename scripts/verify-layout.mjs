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
        backdropBackground: getComputedStyle(document.querySelector("[data-page-backdrop]")).backgroundImage,
        backdropBackgroundSize: getComputedStyle(document.querySelector("[data-page-backdrop]")).backgroundSize,
        metrics: {
          firstCourse: document.querySelector("[data-course-anchor]") ? rectOf(document.querySelector("[data-course-anchor]")) : null,
          firstCourseTitle: document.querySelector("[data-course-anchor] h2") ? rectOf(document.querySelector("[data-course-anchor] h2")) : null,
          firstDecoration: document.querySelector("[data-course-anchor] img") ? rectOf(document.querySelector("[data-course-anchor] img")) : null,
          bookingVisual: document.querySelector("[data-booking-visual]") ? rectOf(document.querySelector("[data-booking-visual]")) : null,
          carousel: document.querySelector("[data-course-carousel]") ? rectOf(document.querySelector("[data-course-carousel]")) : null,
          carouselDots: document.querySelector("[data-carousel-dots]") ? rectOf(document.querySelector("[data-carousel-dots]")) : null,
        },
        typography: document.querySelector("[data-course-anchor] h2")
          ? {
              lineHeight: getComputedStyle(document.querySelector("[data-course-anchor] h2")).lineHeight,
              letterSpacing: getComputedStyle(document.querySelector("[data-course-anchor] h2")).letterSpacing,
            }
          : null,
        smallControls: Array.from(document.querySelectorAll("a[href], button, [role='slider']"))
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

      function rectOf(element) {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }
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

    if (viewport.width < 768) {
      if (result.backdropBackground === "none") failures.push(`${label}: mobile backdrop background-image is none`);
      if (result.backdropBackgroundSize !== "100% 100%") failures.push(`${label}: mobile backdrop is not mapped across the full content surface`);
    }

    if (pageSpec.key === "courses" && viewport.width === 1440) {
      assertRect(label, "first course", result.metrics.firstCourse, { x: 120, y: 231, width: 1200, height: 652 });
      assertRect(label, "first decoration", result.metrics.firstDecoration, { x: 84, y: 400, width: 394, height: 154 });
      assertRect(label, "booking visual", result.metrics.bookingVisual, { x: 120, y: 584, width: 195, height: 63 });
      assertRect(label, "carousel", result.metrics.carousel, { x: 694, y: 231, width: 626, height: 652 });
      assertRect(label, "carousel dots", result.metrics.carouselDots, { x: 962, y: 873, width: 90, height: 10 });
      if (result.typography?.lineHeight !== "84px" || result.typography?.letterSpacing !== "normal") {
        failures.push(`${label}: desktop course title typography is not 60/84 with normal tracking`);
      }
    }

    if (pageSpec.key === "courses" && viewport.width === 402) {
      assertRect(label, "first course", result.metrics.firstCourse, { x: 24, y: 106, width: 354, height: 504.8 });
      assertRect(label, "first decoration", result.metrics.firstDecoration, { x: 16, y: 65.8, width: 236.4, height: 92.4 });
      assertRect(label, "booking visual", result.metrics.bookingVisual, { x: 142.4, y: 177, width: 117.2, height: 37.8 });
      assertRect(label, "carousel", result.metrics.carousel, { x: 24, y: 241.2, width: 354, height: 369.6 });
      assertRect(label, "carousel dots", result.metrics.carouselDots, { x: 174, y: 604.8, width: 54, height: 6 });
      if (result.typography?.lineHeight !== "50.4px" || result.typography?.letterSpacing !== "normal") {
        failures.push(`${label}: mobile course title typography is not 36/50.4 with normal tracking`);
      }
    }

    const expectedHeight = pageSpec.referenceHeights[viewport.width];
    if (expectedHeight && Math.abs(result.scrollHeight - expectedHeight) > 4) {
      failures.push(`${label}: height ${result.scrollHeight}px differs from reference ${expectedHeight}px`);
    }
  } finally {
    await page.close();
  }
}

function assertRect(label, name, actual, expected, tolerance = 1) {
  if (!actual) {
    failures.push(`${label}: missing ${name}`);
    return;
  }

  for (const key of ["x", "y", "width", "height"]) {
    if (Math.abs(actual[key] - expected[key]) > tolerance) {
      failures.push(`${label}: ${name} ${key}=${actual[key].toFixed(2)} expected ${expected[key]}`);
    }
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
