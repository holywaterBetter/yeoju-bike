import LandingPage from "@/features/landing/LandingPage";
import {
  absoluteSiteUrl,
  breadcrumbJsonLd,
  openGraphMetadata,
  siteDescription,
  siteTitle,
  siteUrl,
  twitterMetadata,
} from "@/lib/siteMetadata";
import type { Metadata } from "next";

const introduceUrl = absoluteSiteUrl("/introduce/");

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: introduceUrl,
  },
  openGraph: openGraphMetadata(siteTitle, siteDescription, introduceUrl),
  twitter: twitterMetadata(siteTitle, siteDescription),
};

export default function Introduce() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "코스 & 예약", url: siteUrl },
              { name: "투어 소개", url: introduceUrl },
            ]),
          ),
        }}
      />
      <LandingPage />
    </>
  );
}
