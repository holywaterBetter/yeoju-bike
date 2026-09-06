import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const baseUrl = process.env.VISUAL_BASE_URL || "http://127.0.0.1:3000";
const outputDir = path.join(process.cwd(), "test-assets", "screenshots", "review-260906");
const pages = [
  ["landing", "/introduce/"],
  ["courses", "/"],
  ["directions", "/reservation/"],
];
const viewports = [
  ["1920", 1920, 1080],
  ["430", 430, 932],
];

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch();

try {
  for (const [pageName, route] of pages) {
    for (const [viewportName, width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        for (let y = 0; y <= document.documentElement.scrollHeight - innerHeight; y += Math.max(360, innerHeight * 0.8)) {
          scrollTo(0, y);
          await wait(50);
        }
        scrollTo(0, 0);
        await document.fonts.ready;
      });
      const outputPath = path.join(outputDir, `${pageName}-${viewportName}.png`);
      await page.screenshot({ path: outputPath, fullPage: true });
      console.log(`[capture] ${path.relative(process.cwd(), outputPath)}`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
