import LandingPage from "@/features/landing/LandingPage";
import { localBusinessJsonLd, openGraphMetadata, siteDescription, siteTitle, siteUrl, twitterMetadata } from "@/lib/siteMetadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: openGraphMetadata(siteTitle, siteDescription, siteUrl),
  twitter: twitterMetadata(siteTitle, siteDescription),
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
