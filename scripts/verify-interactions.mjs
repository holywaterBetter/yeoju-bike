import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.INTERACTION_BASE_URL || process.env.LAYOUT_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch();
const failures = [];

const anchors = ["hangul-tour", "golden-bell-tour", "k-yeoju-tour", "club-tour"];
const bookingLinks = [
  "https://event-us.kr/yeojubiketour/event/133588",
  "https://event-us.kr/yeojubiketour/event/133605",
  "https://pf.kakao.com/_NxgwUn",
  "https://event-us.kr/yeojubiketour/event/133610",
];

try {
  await checkLandingLinks();
  await checkCourses();
  await checkMobileSwipe();
  await checkSharedContent();
} finally {
  await browser.close();
}

if (failures.length) {
  for (const failure of failures) console.error(`[fail] ${failure}`);
  process.exit(1);
}

console.log("[pass] carousel, booking link, shared footer, and content checks passed");

async function checkLandingLinks() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
    const hrefs = await page.locator('a[aria-label$="코스와 예약 보기"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    const expected = anchors.map((anchor) => `/courses/#${anchor}`);
    if (JSON.stringify(hrefs) !== JSON.stringify(expected)) failures.push(`landing course links: ${JSON.stringify(hrefs)}`);
  } finally {
    await page.close();
  }
}

async function checkCourses() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(new URL("/courses/", baseUrl).toString(), { waitUntil: "networkidle" });
    const carousels = page.locator("[data-course-carousel]");
    if ((await carousels.count()) !== 4) failures.push(`expected four carousels, found ${await carousels.count()}`);

    for (let index = 0; index < (await carousels.count()); index += 1) {
      const carousel = carousels.nth(index);
      if ((await carousel.locator('[aria-roledescription="slide"]').count()) !== 5) failures.push(`carousel ${index + 1}: expected five slides`);
      if ((await carousel.locator("[data-carousel-dot]").count()) !== 5) failures.push(`carousel ${index + 1}: expected five dots`);
      if ((await carousel.locator('[data-carousel-dot][aria-current="true"]').getAttribute("data-carousel-dot")) !== "0") failures.push(`carousel ${index + 1}: first dot not active`);
    }

    const first = carousels.first();
    await first.locator('[data-carousel-dot="4"]').click();
    if ((await first.locator('[data-carousel-dot][aria-current="true"]').getAttribute("data-carousel-dot")) !== "4") failures.push("dot click did not activate fifth slide");
    if ((await first.locator('[aria-live="polite"]').textContent())?.replace(/\s+/g, " ").trim() !== "5 / 5") failures.push("carousel status did not report 5 / 5");
    await first.press("ArrowRight");
    if ((await first.locator('[data-carousel-dot][aria-current="true"]').getAttribute("data-carousel-dot")) !== "4") failures.push("carousel wrapped after last slide");
    await first.press("Home");
    await first.press("ArrowRight");
    if ((await first.locator('[data-carousel-dot][aria-current="true"]').getAttribute("data-carousel-dot")) !== "1") failures.push("keyboard ArrowRight did not activate second slide");

    const hrefs = await page.locator("a[data-booking-kind]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    if (JSON.stringify(hrefs) !== JSON.stringify(bookingLinks)) failures.push(`booking links: ${JSON.stringify(hrefs)}`);
  } finally {
    await page.close();
  }
}

async function checkMobileSwipe() {
  const context = await browser.newContext({ viewport: { width: 402, height: 874 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  try {
    await page.goto(new URL("/courses/", baseUrl).toString(), { waitUntil: "networkidle" });
    const carousel = page.locator("[data-course-carousel]").first();
    const viewport = carousel.locator("div").first();
    const box = await viewport.boundingBox();
    if (!box) {
      failures.push("mobile swipe: missing carousel viewport");
      return;
    }

    const cdp = await context.newCDPSession(page);
    const y = box.y + box.height / 2;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.width * 0.8, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: box.x + box.width * 0.2, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(80);
    if ((await carousel.locator('[data-carousel-dot][aria-current="true"]').getAttribute("data-carousel-dot")) !== "1") failures.push("mobile swipe did not activate second slide");
  } finally {
    await context.close();
  }
}

async function checkSharedContent() {
  const page = await browser.newPage({ viewport: { width: 402, height: 874 } });
  try {
    for (const route of ["/", "/courses/", "/reservation/"]) {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
      if ((await page.locator("[data-contact-footer]").count()) !== 1) failures.push(`${route}: shared footer count mismatch`);
      if ((await page.locator('[data-contact-footer] img[alt="여주시"], [data-contact-footer] img[alt="여주세종문화관광재단"]').count()) !== 2) failures.push(`${route}: official footer logos missing`);
      const html = await page.content();
      for (const legacyText of ["한글길 이야기 코스", "한글길 수수께끼 코스", "K-컬쳐 코스", "바이크 챌린지 코스"]) {
        if (html.includes(legacyText)) failures.push(`${route}: legacy course name remains — ${legacyText}`);
      }
    }
  } finally {
    await page.close();
  }
}
