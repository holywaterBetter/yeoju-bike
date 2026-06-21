import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.VISUAL_BASE_URL || "http://127.0.0.1:3000";
const root = process.cwd();
const outDir = path.join(root, "visual-diffs");
const maxMismatchPercent = Number.parseFloat(
  process.env.VISUAL_MAX_MISMATCH_PERCENT || "1"
);
const channelTolerance = Number.parseInt(
  process.env.VISUAL_CHANNEL_TOLERANCE || "2",
  10
);

if (!Number.isFinite(maxMismatchPercent) || maxMismatchPercent < 0) {
  console.error("VISUAL_MAX_MISMATCH_PERCENT must be a non-negative number.");
  process.exit(1);
}

if (
  !Number.isFinite(channelTolerance) ||
  channelTolerance < 0 ||
  channelTolerance > 255
) {
  console.error("VISUAL_CHANNEL_TOLERANCE must be an integer from 0 to 255.");
  process.exit(1);
}

const pages = [
  {
    name: "01-landing",
    route: "/",
    width: 1440,
    height: 5693,
    reference: "test-assets/figma/reference/01-landing.png"
  },
  {
    name: "02-courses",
    route: "/courses",
    width: 1440,
    height: 8472,
    reference: "test-assets/figma/reference/02-courses.png"
  },
  {
    name: "04-reservation",
    route: "/reservation",
    width: 1440,
    height: 2415,
    reference: "test-assets/figma/reference/04-reservation.png"
  }
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

try {
  for (const pageSpec of pages) {
    const page = await browser.newPage({
      viewport: { width: pageSpec.width, height: 1000 },
      deviceScaleFactor: 1
    });

    await page.goto(`${baseUrl}${pageSpec.route}`, { waitUntil: "networkidle" });
    await loadRenderedImages(page);
    await page.evaluate(async () => {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    });
    const runtimeReferenceImages = await page.evaluate(() =>
      Array.from(document.images)
        .map((image) => image.currentSrc || image.src)
        .filter((src) => src.includes("/assets/figma/reference/"))
    );
    const runtimeCropImages = await page.evaluate(() =>
      Array.from(document.images)
        .map((image) => image.currentSrc || image.src)
        .filter((src) => src.includes("/assets/figma/crops/"))
    );

    if (runtimeReferenceImages.length > 0) {
      results.push({
        name: pageSpec.name,
        status: "fail",
        reason: `runtime reference PNG rendered: ${runtimeReferenceImages.join(", ")}`
      });
      await page.close();
      continue;
    }

    if (runtimeCropImages.length > 0) {
      results.push({
        name: pageSpec.name,
        status: "fail",
        reason: `runtime crop PNG rendered: ${runtimeCropImages.join(", ")}`
      });
      await page.close();
      continue;
    }

    const screenshotPath = path.join(outDir, `${pageSpec.name}.actual.png`);
    const actualBuffer = await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    const referenceBuffer = fs.readFileSync(path.join(root, pageSpec.reference));
    const comparison = await compareImagesInBrowser(
      page,
      referenceBuffer,
      actualBuffer,
      channelTolerance
    );
    await page.close();

    if (
      comparison.reference.width !== comparison.actual.width ||
      comparison.reference.height !== comparison.actual.height
    ) {
      results.push({
        name: pageSpec.name,
        status: "fail",
        reason: `dimension mismatch reference=${comparison.reference.width}x${comparison.reference.height} actual=${comparison.actual.width}x${comparison.actual.height}`
      });
      continue;
    }

    const mismatch = comparison.mismatch;
    const pixels = comparison.reference.width * comparison.reference.height;
    const mismatchPercent = (mismatch / pixels) * 100;

    results.push({
      name: pageSpec.name,
      status: mismatchPercent <= maxMismatchPercent ? "pass" : "fail",
      mismatch,
      pixels
    });
  }
} finally {
  await browser.close();
}

let hasFailure = false;
for (const result of results) {
  if (result.status === "fail") {
    hasFailure = true;
    if (result.reason) {
      console.error(`[fail] ${result.name}: ${result.reason}`);
      continue;
    }
  }

  const ratio = (result.mismatch / result.pixels) * 100;
  const line = `[${result.status}] ${result.name}: ${result.mismatch} differing pixels (${ratio.toFixed(4)}%, threshold ${maxMismatchPercent.toFixed(4)}%)`;

  if (result.status === "fail") {
    console.error(line);
  } else {
    console.log(line);
  }
}

if (hasFailure) {
  process.exitCode = 1;
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
    })
  );
}

async function compareImagesInBrowser(
  page,
  referenceBuffer,
  actualBuffer,
  tolerance
) {
  const referenceDataUrl = `data:image/png;base64,${referenceBuffer.toString("base64")}`;
  const actualDataUrl = `data:image/png;base64,${actualBuffer.toString("base64")}`;

  return page.evaluate(
    async ({ referenceDataUrl, actualDataUrl, tolerance }) => {
      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.decoding = "sync";
          image.onload = () => resolve(image);
          image.onerror = () => reject(new Error("Unable to decode PNG image."));
          image.src = src;
        });

      const [referenceImage, actualImage] = await Promise.all([
        loadImage(referenceDataUrl),
        loadImage(actualDataUrl)
      ]);

      const reference = {
        width: referenceImage.naturalWidth,
        height: referenceImage.naturalHeight
      };
      const actual = {
        width: actualImage.naturalWidth,
        height: actualImage.naturalHeight
      };

      if (reference.width !== actual.width || reference.height !== actual.height) {
        return { reference, actual, mismatch: Number.POSITIVE_INFINITY };
      }

      const canvas = document.createElement("canvas");
      canvas.width = reference.width;
      canvas.height = reference.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, reference.width, reference.height);
      context.drawImage(referenceImage, 0, 0);
      const referencePixels = context.getImageData(
        0,
        0,
        reference.width,
        reference.height
      ).data;

      context.clearRect(0, 0, reference.width, reference.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, reference.width, reference.height);
      context.drawImage(actualImage, 0, 0);
      const actualPixels = context.getImageData(
        0,
        0,
        reference.width,
        reference.height
      ).data;

      let mismatch = 0;
      for (let index = 0; index < referencePixels.length; index += 4) {
        const red = Math.abs(referencePixels[index] - actualPixels[index]);
        const green = Math.abs(referencePixels[index + 1] - actualPixels[index + 1]);
        const blue = Math.abs(referencePixels[index + 2] - actualPixels[index + 2]);

        if (
          red > tolerance ||
          green > tolerance ||
          blue > tolerance
        ) {
          mismatch += 1;
        }
      }

      return { reference, actual, mismatch };
    },
    { referenceDataUrl, actualDataUrl, tolerance }
  );
}
