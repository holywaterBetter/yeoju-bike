import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { chromium } from "playwright";

const baseUrl = process.env.VISUAL_BASE_URL || "http://127.0.0.1:3000";
const root = process.cwd();
const outputDir = path.join(root, "visual-diffs", "fidelity");
const maxMeanDelta = Number.parseFloat(process.env.FIGMA_MAX_MEAN_DELTA || "1.5");
const specs = [
  ["01-landing", "/", 1440, "test-assets/figma/reference/01-landing.png", false],
  ["01-landing-mobile", "/", 402, "test-assets/figma/reference/01-landing-mobile.png", true],
  ["02-courses", "/courses/", 1440, "test-assets/figma/reference/02-courses.png", false],
  // The product keeps a user-approved 47px safety gap below the sticky header.
  // Remove only that product override while comparing the underlying Figma layout.
  [
    "02-courses-mobile",
    "/courses/",
    402,
    "test-assets/figma/reference/02-courses-mobile.png",
    true,
    '[data-responsive-page="courses"] main{padding-top:3px!important}',
  ],
  ["03-directions", "/reservation/", 1440, "test-assets/figma/reference/03-directions.png", false],
  ["03-directions-mobile", "/reservation/", 402, "test-assets/figma/reference/03-directions-mobile.png", true],
];

const detailRegions = {
  "01-landing": [
    ["guide title and decoration", 280, 2990, 500, 300, 6.5],
    ["Sena media and decoration", 40, 3380, 1000, 380, 3.5],
    ["Sena pink squiggle", 45, 3495, 135, 60, 1.5],
    ["shared footer", 80, 4900, 1280, 500, 3],
  ],
  "01-landing-mobile": [
    ["hero typography", 0, 90, 402, 260, 5],
    ["river media", 24, 721, 354, 200, 2.5],
    ["PAS media", 24, 1675, 354, 210, 3],
    ["guide media", 24, 2106, 354, 210, 6],
    ["Sena media", 24, 2522, 354, 210, 6],
    ["three feature rows", 0, 1550, 402, 1370, 6],
  ],
  "02-courses": [
    ["first booking row", 70, 380, 1250, 520, 2],
    ["golden bell direction", 468, 1269, 195, 154, 2.5],
    ["gift mask icon", 280, 4047, 80, 80, 0.25],
    ["gift keyring icon", 680, 4047, 80, 80, 0.25],
    ["gift camera icon", 1080, 4047, 80, 80, 0.25],
    ["gift clicker icon", 280, 4347, 80, 80, 0.25],
    ["gift pottery icon", 680, 4347, 80, 80, 0.25],
    // The current Figma frame incorrectly shows a bottle here. The product uses
    // the previously approved T-shirt export, which is guarded by layout and
    // product-regression tests instead of this Figma-only crop comparison.
  ],
  "02-courses-mobile": [
    ["first booking row", 0, 80, 402, 560, 3],
    ["gift grid", 0, 2740, 402, 600, 5.5],
  ],
};

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();
const failures = [];

try {
  for (const [name, route, width, referencePath, hideProductMobileBackdrop, comparisonStyle] of specs) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
    if (hideProductMobileBackdrop) {
      await page.addStyleTag({ content: "[data-page-backdrop]{background-image:none!important;background-color:#fff!important}" });
    }
    if (comparisonStyle) await page.addStyleTag({ content: comparisonStyle });
    await loadRenderedImages(page);
    const actualPath = path.join(outputDir, `${name}.actual.png`);
    await page.screenshot({ path: actualPath, fullPage: true });
    await page.close();

    const reference = path.join(root, referencePath);
    const [referenceMeta, actualMeta] = await Promise.all([sharp(reference).metadata(), sharp(actualPath).metadata()]);
    if (referenceMeta.width !== actualMeta.width || referenceMeta.height !== actualMeta.height) {
      failures.push(`${name}: dimension mismatch ${actualMeta.width}x${actualMeta.height}, expected ${referenceMeta.width}x${referenceMeta.height}`);
      continue;
    }

    const [referencePixels, actualPixels] = await Promise.all([normalize(reference), normalize(actualPath)]);
    let absoluteDelta = 0;
    for (let index = 0; index < referencePixels.length; index += 1) {
      absoluteDelta += Math.abs(referencePixels[index] - actualPixels[index]);
    }
    const meanDelta = (absoluteDelta / referencePixels.length / 255) * 100;
    const status = meanDelta <= maxMeanDelta ? "pass" : "fail";
    console.log(`[${status}] ${name}: blurred mean color delta ${meanDelta.toFixed(3)}% (threshold ${maxMeanDelta.toFixed(3)}%)`);
    if (status === "fail") failures.push(`${name}: fidelity delta ${meanDelta.toFixed(3)}%`);

    for (const [regionName, left, top, width, height, threshold] of detailRegions[name] ?? []) {
      const [referenceRegion, actualRegion] = await Promise.all([
        readRegion(reference, { left, top, width, height }),
        readRegion(actualPath, { left, top, width, height }),
      ]);
      let regionAbsoluteDelta = 0;
      for (let index = 0; index < referenceRegion.length; index += 1) {
        regionAbsoluteDelta += Math.abs(referenceRegion[index] - actualRegion[index]);
      }
      const regionMeanDelta = (regionAbsoluteDelta / referenceRegion.length / 255) * 100;
      const regionStatus = regionMeanDelta <= threshold ? "pass" : "fail";
      console.log(`  [${regionStatus}] ${regionName}: raw mean delta ${regionMeanDelta.toFixed(3)}% (threshold ${threshold.toFixed(3)}%)`);
      if (regionStatus === "fail") failures.push(`${name} ${regionName}: detailed fidelity delta ${regionMeanDelta.toFixed(3)}%`);
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  failures.forEach((failure) => console.error(`[fail] ${failure}`));
  process.exit(1);
}

async function normalize(input) {
  return sharp(input)
    .resize({ width: 180 })
    .blur(4)
    .removeAlpha()
    .raw()
    .toBuffer();
}

async function readRegion(input, region) {
  return sharp(input)
    .extract(region)
    .removeAlpha()
    .raw()
    .toBuffer();
}

async function loadRenderedImages(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let y = 0; y <= document.documentElement.scrollHeight - innerHeight; y += Math.max(360, innerHeight * 0.8)) {
      scrollTo(0, y);
      await wait(50);
    }
    scrollTo(0, 0);
    await document.fonts.ready;
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
}
