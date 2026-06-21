import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "visual-diffs", "report");
const pages = [
  {
    name: "01-landing",
    reference: "test-assets/figma/reference/01-landing.png",
    actual: "visual-diffs/01-landing.actual.png",
    crops: [0, 900, 1800, 2700, 3600, 4500, 5193]
  },
  {
    name: "02-courses",
    reference: "test-assets/figma/reference/02-courses.png",
    actual: "visual-diffs/02-courses.actual.png",
    crops: [0, 1000, 2200, 3400, 4600, 5800, 7000, 7600]
  },
  {
    name: "04-reservation",
    reference: "test-assets/figma/reference/04-reservation.png",
    actual: "visual-diffs/04-reservation.actual.png",
    crops: [0, 650, 1300, 1900]
  }
];

const tolerance = Number.parseInt(process.env.VISUAL_CHANNEL_TOLERANCE || "2", 10);

await fs.mkdir(outDir, { recursive: true });

for (const page of pages) {
  const referencePath = path.join(root, page.reference);
  const actualPath = path.join(root, page.actual);
  const reference = await loadImage(referencePath);
  const actual = await loadImage(actualPath);

  if (reference.info.width !== actual.info.width || reference.info.height !== actual.info.height) {
    console.error(`${page.name}: dimension mismatch`);
    continue;
  }

  const { width, height } = reference.info;
  const diff = Buffer.alloc(width * height * 4);
  let mismatch = 0;

  for (let index = 0; index < reference.raw.length; index += 4) {
    const red = Math.abs(reference.raw[index] - actual.raw[index]);
    const green = Math.abs(reference.raw[index + 1] - actual.raw[index + 1]);
    const blue = Math.abs(reference.raw[index + 2] - actual.raw[index + 2]);
    const differs = red > tolerance || green > tolerance || blue > tolerance;

    if (differs) {
      mismatch += 1;
      diff[index] = 255;
      diff[index + 1] = 0;
      diff[index + 2] = 96;
      diff[index + 3] = 255;
    } else {
      const gray = Math.round(
        reference.raw[index] * 0.2126 +
        reference.raw[index + 1] * 0.7152 +
        reference.raw[index + 2] * 0.0722
      );
      diff[index] = gray;
      diff[index + 1] = gray;
      diff[index + 2] = gray;
      diff[index + 3] = 90;
    }
  }

  await sharp(diff, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, `${page.name}.diff.png`));

  const mismatchPercent = (mismatch / (width * height)) * 100;
  console.log(`${page.name}: ${mismatch} differing pixels (${mismatchPercent.toFixed(4)}%)`);

  for (const y of page.crops) {
    const cropHeight = Math.min(900, height - y);
    if (cropHeight <= 0) {
      continue;
    }

    const referenceCrop = await sharp(referencePath)
      .extract({ left: 0, top: y, width, height: cropHeight })
      .resize({ width: 720 })
      .png()
      .toBuffer();
    const actualCrop = await sharp(actualPath)
      .extract({ left: 0, top: y, width, height: cropHeight })
      .resize({ width: 720 })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: 1460,
        height: Math.round((cropHeight * 720) / width),
        channels: 4,
        background: "#ffffff"
      }
    })
      .composite([
        { input: referenceCrop, left: 0, top: 0 },
        { input: actualCrop, left: 740, top: 0 }
      ])
      .png()
      .toFile(path.join(outDir, `${page.name}.${y}.side-by-side.png`));
  }
}

async function loadImage(filePath) {
  const image = sharp(filePath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  return { raw: data, info };
}
