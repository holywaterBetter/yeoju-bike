import LandingPage from "@/features/landing/LandingPage";
import { localBusinessJsonLd, siteDescription, siteName, siteOgImage, siteOgImageAlt, siteTitle, siteUrl } from "@/lib/siteMetadata";
import { withBasePath } from "@/lib/sitePaths";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: siteOgImage,
        width: 1200,
        height: 630,
        alt: siteOgImageAlt,
        type: "image/png",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={withBasePath("/assets/figma/groups/landing-hero-group.webp")}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={withBasePath("/assets/figma/groups/landing-hero-bike-source-mobile.webp")}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
      />
      <LandingPage />
    </>
  );
}
