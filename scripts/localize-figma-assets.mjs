import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "src", "features");
const outDir = path.join(root, "public", "assets", "figma", "mcp");
const publicPrefix = "/assets/figma/mcp";
const urlPattern = /https:\/\/www\.figma\.com\/api\/mcp\/asset\/[a-f0-9-]+/g;

const extensionByType = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/svg+xml", "svg"],
  ["image/webp", "webp"]
]);

async function listSourceFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listSourceFiles(fullPath));
      continue;
    }

    if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function assetId(url) {
  return url.slice(url.lastIndexOf("/") + 1);
}

async function download(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type")?.split(";")[0] ?? "";
  const extension = extensionByType.get(contentType);

  if (!extension) {
    throw new Error(`Unsupported content type for ${url}: ${contentType || "(missing)"}`);
  }

  const id = assetId(url);
  const fileName = `${id}.${extension}`;
  const absolutePath = path.join(outDir, fileName);
  const buffer = Buffer.from(await response.arrayBuffer());

  await fs.writeFile(absolutePath, buffer);

  return `${publicPrefix}/${fileName}`;
}

await fs.mkdir(outDir, { recursive: true });

const files = await listSourceFiles(sourceDir);
const contents = new Map();
const urls = new Set();

for (const file of files) {
  const text = await fs.readFile(file, "utf8");
  contents.set(file, text);

  for (const match of text.matchAll(urlPattern)) {
    urls.add(match[0]);
  }
}

const replacements = new Map();

for (const url of urls) {
  const localPath = await download(url);
  replacements.set(url, localPath);
  console.log(`${url} -> ${localPath}`);
}

for (const [file, originalText] of contents) {
  let text = originalText;

  for (const [url, localPath] of replacements) {
    text = text.split(url).join(localPath);
  }

  if (text !== originalText) {
    await fs.writeFile(file, text);
  }
}

console.log(`Localized ${replacements.size} Figma assets.`);
