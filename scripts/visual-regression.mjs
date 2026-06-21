import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { chromium } from "playwright";

const mode = process.argv[2] || "compare";
const baseUrl = process.env.VISUAL_BASE_URL || "http://127.0.0.1:3000";
const root = process.cwd();
const baselineDir = path.join(root, process.env.VISUAL_BASELINE_DIR || "test-assets/screenshots/baseline");
const actualDir = path.join(root, process.env.VISUAL_ACTUAL_DIR || "visual-diffs/current");
const diffDir = path.join(root, process.env.VISUAL_DIFF_DIR || "visual-diffs/diff");
const maxMismatchPercent = Number.parseFloat(process.env.VISUAL_MAX_MISMATCH_PERCENT || "0.1");
const channelTolerance = Number.parseInt(process.env.VISUAL_CHANNEL_TOLERANCE || "2", 10);

const pages = [
  { key: "landing", route: "/" },
  { key: "courses", route: "/courses" },
  { key: "reservation", route: "/reservation" },
];

const viewports = [
  { key: "pc", width: 1440, height: 900 },
  { key: "tablet", width: 1024, height: 768 },
  { key: "mobile", width: 390, height: 844 },
];

if (!["baseline", "compare"].includes(mode)) {
  console.error("Usage: node scripts/visual-regression.mjs <baseline|compare>");
  process.exit(2);
}

if (!Number.isFinite(maxMismatchPercent) || maxMismatchPercent < 0) {
  console.error("VISUAL_MAX_MISMATCH_PERCENT must be a non-negative number.");
  process.exit(1);
}

if (!Number.isFinite(channelTolerance) || channelTolerance < 0 || channelTolerance > 255) {
  console.error("VISUAL_CHANNEL_TOLERANCE must be an integer from 0 to 255.");
  process.exit(1);
}

await fs.mkdir(mode === "baseline" ? baselineDir : actualDir, { recursive: true });
if (mode === "compare") {
  await fs.mkdir(diffDir, { recursive: true });
}

const browser = await chromium.launch();
const results = [];

try {
  for (const pageSpec of pages) {
    for (const viewport of viewports) {
      const name = `${pageSpec.key}-${viewport.key}`;
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });

      try {
        await page.goto(new URL(pageSpec.route, baseUrl).toString(), { waitUntil: "networkidle" });
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 1ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 1ms !important;
              caret-color: transparent !important;
            }
            html { scroll-behavior: auto !important; }
          `,
        });
        await loadRenderedImages(page);
        await page.evaluate(async () => {
          if ("fonts" in document) {
            await document.fonts.ready;
          }
        });
        await page.waitForTimeout(120);

        const targetPath = path.join(mode === "baseline" ? baselineDir : actualDir, `${name}.png`);
        const actualBuffer = await page.screenshot({ path: targetPath, fullPage: true });

        if (mode === "baseline") {
          results.push({ name, status: "baseline", path: path.relative(root, targetPath) });
          continue;
        }

        const baselinePath = path.join(baselineDir, `${name}.png`);
        const baselineBuffer = await fs.readFile(baselinePath);
        const comparison = await comparePngs({
          baselineBuffer,
          actualBuffer,
          diffPath: path.join(diffDir, `${name}.diff.png`),
          tolerance: channelTolerance,
        });

        if (comparison.reason) {
          results.push({ name, status: "fail", reason: comparison.reason });
          continue;
        }

        const mismatchPercent = (comparison.mismatch / comparison.pixels) * 100;
        results.push({
          name,
          status: mismatchPercent <= maxMismatchPercent ? "pass" : "fail",
          mismatch: comparison.mismatch,
          pixels: comparison.pixels,
          mismatchPercent,
        });
      } catch (error) {
        results.push({ name, status: "fail", reason: error instanceof Error ? error.message : String(error) });
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}

let hasFailure = false;

for (const result of results) {
  if (result.status === "baseline") {
    console.log(`[baseline] ${result.name}: ${result.path}`);
    continue;
  }

  if (result.status === "fail") {
    hasFailure = true;
  }

  if (result.reason) {
    console.error(`[fail] ${result.name}: ${result.reason}`);
    continue;
  }

  const line = `[${result.status}] ${result.name}: ${result.mismatch} differing pixels (${result.mismatchPercent.toFixed(4)}%, threshold ${maxMismatchPercent.toFixed(4)}%)`;
  if (result.status === "pass") {
    console.log(line);
  } else {
    console.error(line);
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
    }),
  );
}

async function comparePngs({ baselineBuffer, actualBuffer, diffPath, tolerance }) {
  const [baseline, actual] = await Promise.all([
    sharp(baselineBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(actualBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
  ]);

  if (baseline.info.width !== actual.info.width || baseline.info.height !== actual.info.height) {
    return {
      reason: `dimension mismatch baseline=${baseline.info.width}x${baseline.info.height} actual=${actual.info.width}x${actual.info.height}`,
    };
  }

  const pixels = baseline.info.width * baseline.info.height;
  const diff = Buffer.alloc(pixels * 4);
  let mismatch = 0;

  for (let index = 0; index < baseline.data.length; index += 4) {
    const red = Math.abs(baseline.data[index] - actual.data[index]);
    const green = Math.abs(baseline.data[index + 1] - actual.data[index + 1]);
    const blue = Math.abs(baseline.data[index + 2] - actual.data[index + 2]);
    const differs = red > tolerance || green > tolerance || blue > tolerance;

    if (differs) {
      mismatch += 1;
      diff[index] = 255;
      diff[index + 1] = 0;
      diff[index + 2] = 96;
      diff[index + 3] = 255;
    } else {
      const gray = Math.round(
        baseline.data[index] * 0.2126 +
          baseline.data[index + 1] * 0.7152 +
          baseline.data[index + 2] * 0.0722,
      );
      diff[index] = gray;
      diff[index + 1] = gray;
      diff[index + 2] = gray;
      diff[index + 3] = 90;
    }
  }

  await sharp(diff, {
    raw: {
      width: baseline.info.width,
      height: baseline.info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(diffPath);

  return { mismatch, pixels };
}
