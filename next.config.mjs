/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "yeoju-bike";
const basePath = configuredBasePath ?? (isGithubPages ? `/${repositoryName}` : "");

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
