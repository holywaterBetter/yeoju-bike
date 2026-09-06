import DirectionsPage from "@/features/directions/DirectionsPage";
import { absoluteSiteUrl, breadcrumbJsonLd, openGraphMetadata, siteTitle, twitterMetadata } from "@/lib/siteMetadata";
import type { Metadata } from "next";

const reservationTitle = "따르릉 여주 오시는 길";
const reservationDescription =
  "따르릉 여주 자전거 시티투어 사랑방의 주소와 지도, 주차장 및 대중교통 이용 방법을 안내합니다.";
const reservationUrl = absoluteSiteUrl("/reservation/");

export const metadata: Metadata = {
  title: reservationTitle,
  description: reservationDescription,
  alternates: {
    canonical: reservationUrl,
  },
  openGraph: openGraphMetadata(reservationTitle, reservationDescription, reservationUrl),
  twitter: twitterMetadata(reservationTitle, reservationDescription),
};

export default function Directions() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: siteTitle, url: absoluteSiteUrl("/") },
              { name: "오시는 길", url: reservationUrl },
            ]),
          ),
        }}
      />
      <DirectionsPage />
    </>
  );
}
