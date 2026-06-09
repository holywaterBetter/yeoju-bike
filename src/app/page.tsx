import LandingPage from "@/features/landing/LandingPage";
import { localBusinessJsonLd, siteDescription, siteName, siteTitle, siteUrl } from "@/lib/siteMetadata";
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
  },
};

export default function Home() {
  return (
    <>
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
