import ReservationPage from "@/features/reservation/ReservationPage";
import { absoluteSiteUrl, siteName, siteOgImage, siteOgImageAlt } from "@/lib/siteMetadata";
import type { Metadata } from "next";

const reservationTitle = "여주 전기자전거 투어 예약";
const reservationDescription =
  "따르릉 여주 시티투어의 전기자전거 투어 예약 페이지입니다. 원하는 여주 여행 코스를 선택해 예약 폼을 작성해 주세요.";
const reservationUrl = absoluteSiteUrl("/reservation/");

export const metadata: Metadata = {
  title: reservationTitle,
  description: reservationDescription,
  alternates: {
    canonical: reservationUrl,
  },
  openGraph: {
    title: `${reservationTitle} | ${siteName}`,
    description: reservationDescription,
    url: reservationUrl,
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

export default function Reservation() {
  return <ReservationPage />;
}
