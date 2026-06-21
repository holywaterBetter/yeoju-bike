import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicAssetsDir = path.join(root, "public", "assets");
const srcDir = path.join(root, "src");
const assetPattern = /(?:public\/)?assets\/[A-Za-z0-9._~/-]+?\.(?:avif|gif|jpe?g|json|png|svg|webp)/gi;
const ignoredSourceExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

function walkFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(filePath));
    } else {
      files.push(filePath);
    }
  }
  return files;
}

function toRepoPath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function toPublicAssetPath(match) {
  const normalized = match.replace(/^\/+/, "");
  return normalized.startsWith("public/") ? normalized : `public/${normalized}`;
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const digits = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(digits)} ${units[unitIndex]}`;
}

const publicAssets = new Map(
  walkFiles(publicAssetsDir).map((filePath) => {
    const repoPath = toRepoPath(filePath);
    return [repoPath, fs.statSync(filePath).size];
  }),
);

const sourceReferences = new Map();
for (const filePath of walkFiles(srcDir)) {
  if (ignoredSourceExtensions.has(path.extname(filePath).toLowerCase())) {
    continue;
  }

  const sourcePath = toRepoPath(filePath);
  const source = fs.readFileSync(filePath, "utf8");
  for (const match of source.matchAll(assetPattern)) {
    const assetPath = toPublicAssetPath(match[0]);
    if (!sourceReferences.has(assetPath)) {
      sourceReferences.set(assetPath, new Set());
    }
    sourceReferences.get(assetPath).add(sourcePath);
  }
}

const unreferencedAssets = [...publicAssets.keys()]
  .filter((assetPath) => !sourceReferences.has(assetPath))
  .sort((a, b) => publicAssets.get(b) - publicAssets.get(a));

const missingAssets = [...sourceReferences.keys()]
  .filter((assetPath) => assetPath.startsWith("public/assets/") && !publicAssets.has(assetPath))
  .sort();

if (unreferencedAssets.length > 0 || missingAssets.length > 0) {
  if (unreferencedAssets.length > 0) {
    const totalSize = unreferencedAssets.reduce((sum, assetPath) => sum + publicAssets.get(assetPath), 0);
    console.error(
      `[assets:audit] ${unreferencedAssets.length} unreferenced public/assets files (${formatBytes(totalSize)}):`,
    );
    for (const assetPath of unreferencedAssets) {
      console.error(`  ${formatBytes(publicAssets.get(assetPath)).padStart(7)}  ${assetPath}`);
    }
  }

  if (missingAssets.length > 0) {
    console.error(`[assets:audit] ${missingAssets.length} missing public/assets references:`);
    for (const assetPath of missingAssets) {
      const sources = [...sourceReferences.get(assetPath)].sort().join(", ");
      console.error(`  ${assetPath} (${sources})`);
    }
  }

  process.exit(1);
}

const totalSize = [...publicAssets.values()].reduce((sum, size) => sum + size, 0);
console.log(`[assets:audit] ${publicAssets.size} public/assets files referenced by src (${formatBytes(totalSize)})`);
