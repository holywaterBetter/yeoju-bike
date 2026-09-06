import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.LAYOUT_BASE_URL || process.env.RESPONSIVE_BASE_URL || "http://127.0.0.1:3000";

const pages = [
  { route: "/", key: "landing", referenceHeights: { 1440: 5440, 402: 4107 } },
  { route: "/courses/", key: "courses", referenceHeights: { 1440: 5247, 402: 3875 } },
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

      const rectFor = (selector) => {
        const element = document.querySelector(selector);
        return element ? rectOf(element) : null;
      };

      const styleFor = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          wordBreak: style.wordBreak,
          zIndex: style.zIndex,
          isolation: style.isolation,
        };
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
          siteHeader: rectFor("[data-site-header]"),
          firstCourse: rectFor("[data-course-anchor]"),
          firstCourseTitle: rectFor("[data-course-anchor] h2"),
          firstDecoration: rectFor('[data-visual-id="course-decoration-hangul-tour"]'),
          bookingVisual: rectFor("[data-booking-visual]"),
          carousel: rectFor("[data-course-carousel]"),
          carouselDots: rectFor("[data-carousel-dots]"),
          bellDecoration: rectFor('[data-visual-id="course-decoration-golden-bell-tour"]'),
          landingHero: rectFor('[data-visual-id="landing-hero"]'),
          landingSpecial: rectFor('[data-visual-id="landing-special"]'),
          guideRow: rectFor('[data-feature="guide"]'),
          guideTitle: rectFor('[data-feature="guide"] h3'),
          guideBody: rectFor('[data-feature="guide"] p'),
          guideMark: rectFor('[data-visual-id="guide-mark"]'),
          guideUnderline: rectFor('[data-visual-id="guide-underline"]'),
          senaRow: rectFor('[data-feature="sena"]'),
          senaSquiggle: rectFor('[data-visual-id="sena-squiggle"]'),
          senaDashOne: rectFor('[data-visual-id="sena-red-dash-one"]'),
          senaDashTwo: rectFor('[data-visual-id="sena-red-dash-two"]'),
          footer: rectFor("[data-contact-footer]"),
          footerTitle: rectFor('[data-visual-id="footer-title"]'),
          footerBody: rectFor('[data-visual-id="footer-body"]'),
          footerKakao: rectFor("[data-kakao-visual]"),
          footerLogos: rectFor('[data-visual-id="footer-logos"]'),
        },
        giftIcons: Array.from(document.querySelectorAll("[data-gift-icon]")).map((element) => {
          const image = element.querySelector("img");
          return {
            key: element.getAttribute("data-gift-icon"),
            rect: rectOf(element),
            imageRect: image ? rectOf(image) : null,
            naturalWidth: image?.naturalWidth ?? 0,
            naturalHeight: image?.naturalHeight ?? 0,
            src: image?.getAttribute("src") ?? "",
          };
        }),
        courseTitleLayers: Array.from(document.querySelectorAll("[data-course-anchor]")).map((section) => {
          const title = section.querySelector("h2");
          const decoration = section.querySelector('[data-visual-id^="course-decoration-"]');
          return {
            anchor: section.getAttribute("data-course-anchor"),
            wrapperIsolation: title?.parentElement ? getComputedStyle(title.parentElement).isolation : null,
            titleZIndex: title ? getComputedStyle(title).zIndex : null,
            decorationZIndex: decoration ? getComputedStyle(decoration).zIndex : null,
          };
        }),
        footerLogoMetrics: Array.from(document.querySelectorAll('[data-visual-id="footer-logos"] img')).map(rectOf),
        featureTitleStyle: styleFor('[data-feature="guide"] h3'),
        guideTitleTextStyle: styleFor('[data-visual-id="guide-title-text"]'),
        guideMarkStyle: styleFor('[data-visual-id="guide-mark"]'),
        guideUnderlineStyle: styleFor('[data-visual-id="guide-underline"]'),
        featureBodyStyle: styleFor('[data-feature="guide"] p'),
        footerStyle: styleFor("[data-contact-footer]"),
        footerTitleStyle: styleFor('[data-visual-id="footer-title"]'),
        footerBodyStyle: styleFor('[data-visual-id="footer-body"] p'),
        footerKakaoStyle: styleFor("[data-kakao-visual]"),
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
      if (pageSpec.key === "courses" && result.metrics.carousel && result.metrics.carouselDots) {
        const expectedCarouselHeight = result.metrics.carousel.width + 15.6;
        if (Math.abs(result.metrics.carousel.height - expectedCarouselHeight) > 1) {
          failures.push(`${label}: carousel height does not follow its square card width`);
        }
        const visualDotGap = result.metrics.carouselDots.y - (result.metrics.carousel.y + result.metrics.carousel.width);
        if (Math.abs(visualDotGap - 9.6) > 1) failures.push(`${label}: carousel dot gap is ${visualDotGap.toFixed(2)}px, expected 9.6px`);
      }
    }

    if (viewport.width === 1440) {
      assertFooter(label, result, 1440);
    }

    if (viewport.width === 402) {
      assertFooter(label, result, 402);
    }

    if (pageSpec.key === "courses" && viewport.width === 1440) {
      assertCourseTitleLayering(label, result.courseTitleLayers);
      assertRect(label, "first course", result.metrics.firstCourse, { x: 120, y: 231, width: 1200, height: 652 });
      assertRect(label, "first decoration", result.metrics.firstDecoration, { x: 84, y: 400, width: 394, height: 154 });
      assertRect(label, "booking visual", result.metrics.bookingVisual, { x: 120, y: 584, width: 195, height: 63 });
      assertRect(label, "carousel", result.metrics.carousel, { x: 694, y: 231, width: 626, height: 652 });
      assertRect(label, "carousel dots", result.metrics.carouselDots, { x: 962, y: 873, width: 90, height: 10 });
      assertRect(label, "golden bell decoration", result.metrics.bellDecoration, { x: 468, y: 1269, width: 195, height: 154 });
      assertGiftIcons(label, result.giftIcons, 69, [
        [285.5, 4052], [685.5, 4052], [1085.5, 4052],
        [285.5, 4352], [685.5, 4352], [1085.5, 4352],
      ]);
      if (result.typography?.lineHeight !== "84px" || result.typography?.letterSpacing !== "normal") {
        failures.push(`${label}: desktop course title typography is not 60/84 with normal tracking`);
      }
    }

    if (pageSpec.key === "courses" && viewport.width === 402) {
      assertCourseTitleLayering(label, result.courseTitleLayers);
      assertRect(label, "site header", result.metrics.siteHeader, { x: 0, y: 0, width: 402, height: 103 });
      assertRect(label, "first course", result.metrics.firstCourse, { x: 24, y: 153, width: 354, height: 504.8 });
      assertRect(label, "first decoration", result.metrics.firstDecoration, { x: 16, y: 112.8, width: 236.4, height: 92.4 });
      assertRect(label, "booking visual", result.metrics.bookingVisual, { x: 142.4, y: 224, width: 117.2, height: 37.8 });
      assertRect(label, "carousel", result.metrics.carousel, { x: 24, y: 288.2, width: 354, height: 369.6 });
      assertRect(label, "carousel dots", result.metrics.carouselDots, { x: 174, y: 651.8, width: 54, height: 6 });
      assertRect(label, "golden bell decoration", result.metrics.bellDecoration, { x: 275.03, y: 706.2, width: 117, height: 92.4 });
      assertGiftIcons(label, result.giftIcons, 41.4, [
        [88.8, 2864.8], [271.8, 2864.8], [88.8, 3031.45],
        [271.8, 3031.45], [88.8, 3198.11], [271.8, 3198.11],
      ]);
      if (
        result.metrics.firstDecoration
        && result.metrics.siteHeader
        && result.metrics.firstDecoration.y < result.metrics.siteHeader.y + result.metrics.siteHeader.height + 8
      ) {
        failures.push(`${label}: first decoration overlaps the sticky header`);
      }
      if (result.typography?.lineHeight !== "50.4px" || result.typography?.letterSpacing !== "normal") {
        failures.push(`${label}: mobile course title typography is not 36/50.4 with normal tracking`);
      }
    }

    if (pageSpec.key === "landing" && viewport.width === 1440) {
      assertRect(label, "landing hero", result.metrics.landingHero, { x: 120, y: 124, width: 1200, height: 524 });
      assertRect(label, "special section", result.metrics.landingSpecial, { x: 116, y: 2408, width: 1204, height: 1338 });
      assertRect(label, "guide row", result.metrics.guideRow, { x: 116, y: 2994, width: 1204, height: 350 });
      assertRect(label, "guide title", result.metrics.guideTitle, { x: 340.48, y: 3064, width: 398.52, height: 120 });
      assertRect(label, "guide body", result.metrics.guideBody, { x: 116, y: 3196, width: 623, height: 78 });
      assertRect(label, "guide mark", result.metrics.guideMark, { x: 304.48, y: 3017, width: 71, height: 88 });
      assertRect(label, "guide underline", result.metrics.guideUnderline, { x: 532, y: 3150, width: 216, height: 40 });
      assertRect(label, "sena row", result.metrics.senaRow, { x: 116, y: 3396, width: 1204, height: 350 });
      assertRect(label, "sena squiggle", result.metrics.senaSquiggle, { x: 51.89, y: 3503.72, width: 123.24, height: 40.06 });
      assertRect(label, "sena first dash", result.metrics.senaDashOne, { x: 926.39, y: 3417.5, width: 22, height: 38 });
      assertRect(label, "sena second dash", result.metrics.senaDashTwo, { x: 940.69, y: 3452.39, width: 41, height: 19 });
      assertTypography(label, result.featureTitleStyle, { fontSize: "42px", lineHeight: "60px", letterSpacing: "-0.65646px", fontWeight: "700" }, "feature title");
      assertTypography(label, result.featureBodyStyle, { fontSize: "21px", lineHeight: "39px", letterSpacing: "-0.651px", fontWeight: "600", color: "rgba(0, 0, 0, 0.7)", wordBreak: "normal" }, "feature body");
      assertGuideTitleLayering(label, result);
    }

    if (pageSpec.key === "landing" && viewport.width === 402) {
      assertRect(label, "landing hero", result.metrics.landingHero, { x: 24, y: 103, width: 354, height: 331.36 });
      assertRect(label, "special section", result.metrics.landingSpecial, { x: 24, y: 1554.77, width: 354, height: 1352 });
      assertRect(label, "guide row", result.metrics.guideRow, { x: 24, y: 2106.36, width: 354, height: 383.41 });
      assertRect(label, "guide body", result.metrics.guideBody, { x: 24, y: 2419.55, width: 354, height: 70.22 });
      assertRect(label, "guide mark", result.metrics.guideMark, { x: 116, y: 2315.77, width: 42.6, height: 52.78 });
      assertRect(label, "guide underline", result.metrics.guideUnderline, { x: 254.2, y: 2396.17, width: 129.6, height: 23.98 });
      assertRect(label, "sena row", result.metrics.senaRow, { x: 24, y: 2520.95, width: 354, height: 383.41 });
      assertRect(label, "sena squiggle", result.metrics.senaSquiggle, { x: 9.83, y: 2568.2, width: 73.8, height: 23.98 });
      assertRect(label, "sena first dash", result.metrics.senaDashOne, { x: 158.48, y: 2736.16, width: 13.19, height: 22.77 });
      assertRect(label, "sena second dash", result.metrics.senaDashTwo, { x: 167.06, y: 2757.45, width: 24.59, height: 11.39 });
      assertTypography(label, result.featureTitleStyle, { fontSize: "25.2px", lineHeight: "36px", letterSpacing: "-0.393876px", fontWeight: "700" }, "feature title");
      assertTypography(label, result.featureBodyStyle, { fontSize: "12.6px", lineHeight: "23.4px", letterSpacing: "-0.3906px", fontWeight: "600", color: "rgba(0, 0, 0, 0.7)", wordBreak: "normal" }, "feature body");
      assertGuideTitleLayering(label, result);
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

function assertGiftIcons(label, icons, visualSize, positions) {
  const expectedKeys = ["mask", "keyring", "camera", "clickerKeyring", "pottery", "tshirt"];
  if (icons.length !== expectedKeys.length) {
    failures.push(`${label}: expected ${expectedKeys.length} gift icons, found ${icons.length}`);
    return;
  }

  icons.forEach((icon, index) => {
    if (icon.key !== expectedKeys[index]) failures.push(`${label}: gift icon ${index + 1} key=${icon.key}, expected ${expectedKeys[index]}`);
    assertRect(label, `gift icon ${icon.key}`, icon.rect, { x: positions[index][0], y: positions[index][1], width: visualSize, height: visualSize });
    assertRect(label, `gift icon image ${icon.key}`, icon.imageRect, { x: positions[index][0], y: positions[index][1], width: visualSize, height: visualSize });
    if (icon.naturalWidth !== 69 || icon.naturalHeight !== 69) failures.push(`${label}: gift icon ${icon.key} source is not a 69x69 Figma group export`);
    if (!icon.src.includes("/assets/figma/260906/gifts/")) failures.push(`${label}: gift icon ${icon.key} does not use the corrected Figma group asset`);
  });
}

function assertGuideTitleLayering(label, result) {
  if (result.featureTitleStyle?.isolation !== "isolate") failures.push(`${label}: guide title is not an isolated stacking context`);
  if (result.guideTitleTextStyle?.zIndex !== "1") failures.push(`${label}: guide title text is not above its decorations`);
  if (result.guideMarkStyle?.zIndex !== "0" || result.guideUnderlineStyle?.zIndex !== "0") {
    failures.push(`${label}: guide decorations are not behind the title text`);
  }
}

function assertCourseTitleLayering(label, layers) {
  if (layers.length !== 4) {
    failures.push(`${label}: expected four course title layering records, found ${layers.length}`);
    return;
  }

  for (const layer of layers) {
    if (layer.wrapperIsolation !== "isolate" || layer.titleZIndex !== "1" || layer.decorationZIndex !== "0") {
      failures.push(`${label}: ${layer.anchor} title/decorative asset stacking order is incorrect`);
    }
  }
}

function assertFooter(label, result, width) {
  const footer = result.metrics.footer;
  if (!footer) {
    failures.push(`${label}: missing footer metrics`);
    return;
  }

  if (width === 1440) {
    assertRect(label, "footer", footer, { x: 0, y: footer.y, width: 1440, height: 563 });
    assertRect(label, "footer title", result.metrics.footerTitle, { x: 117, y: footer.y + 85, width: 873, height: 84 });
    assertRect(label, "footer body", result.metrics.footerBody, { x: 117, y: footer.y + 193, width: 873, height: 195 });
    assertRect(label, "footer Kakao button", result.metrics.footerKakao, { x: 1038, y: footer.y + 237, width: 279, height: 65 });
    assertRect(label, "footer logo row", result.metrics.footerLogos, { x: 117, y: footer.y + 454, width: 1200, height: 63 });
    assertRect(label, "Yeoju footer logo", result.footerLogoMetrics[0], { x: 117, y: footer.y + 454, width: 127, height: 63 });
    assertRect(label, "foundation footer logo", result.footerLogoMetrics[1], { x: 295, y: footer.y + 464.5, width: 256, height: 42 });
    assertTypography(label, result.footerTitleStyle, { fontSize: "60px", lineHeight: "84px", fontWeight: "800", color: "rgb(0, 0, 0)" }, "footer title");
    assertTypography(label, result.footerBodyStyle, { fontSize: "21px", lineHeight: "39px", fontWeight: "400", color: "rgba(0, 0, 0, 0.7)" }, "footer body");
    assertTypography(label, result.footerKakaoStyle, { fontSize: "24px", fontWeight: "700", color: "rgb(0, 0, 0)" }, "footer Kakao button");
  } else {
    assertRect(label, "footer", footer, { x: 0, y: footer.y, width: 402, height: 497.64 });
    assertRect(label, "footer title", result.metrics.footerTitle, { x: 24, y: footer.y + 51, width: 280, height: 100.8 });
    assertRect(label, "footer body", result.metrics.footerBody, { x: 24, y: footer.y + 166.2, width: 354, height: 163.83 });
    assertRect(label, "footer Kakao button", result.metrics.footerKakao, { x: 24, y: footer.y + 360.05, width: 167.4, height: 39.2 });
    assertRect(label, "footer logo row", result.metrics.footerLogos, { x: 24, y: footer.y + 439.25, width: 354, height: 37.8 });
    assertRect(label, "Yeoju footer logo", result.footerLogoMetrics[0], { x: 24, y: footer.y + 439.25, width: 76.2, height: 37.8 });
    assertRect(label, "foundation footer logo", result.footerLogoMetrics[1], { x: 130.8, y: footer.y + 445.55, width: 153.6, height: 25.2 });
    assertTypography(label, result.footerTitleStyle, { fontSize: "36px", lineHeight: "50.4px", fontWeight: "800", color: "rgb(0, 0, 0)" }, "footer title");
    assertTypography(label, result.footerBodyStyle, { fontSize: "12.6px", lineHeight: "23.4px", fontWeight: "400", color: "rgba(0, 0, 0, 0.7)" }, "footer body");
    assertTypography(label, result.footerKakaoStyle, { fontSize: "14.4px", fontWeight: "700", color: "rgb(0, 0, 0)" }, "footer Kakao button");
  }

  if (result.footerStyle?.backgroundColor !== "rgb(242, 242, 242)") failures.push(`${label}: footer background is ${result.footerStyle?.backgroundColor}, expected rgb(242, 242, 242)`);
  if (!result.footerBodyStyle?.fontFamily.includes("Nunito Sans")) failures.push(`${label}: footer body does not use Nunito Sans`);
}

function assertTypography(label, actual, expected, name) {
  if (!actual) {
    failures.push(`${label}: missing ${name} style`);
    return;
  }

  for (const [property, expectedValue] of Object.entries(expected)) {
    if (actual[property] !== expectedValue) failures.push(`${label}: ${name} ${property}=${actual[property]}, expected ${expectedValue}`);
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
