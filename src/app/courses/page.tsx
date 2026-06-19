import CoursesPage from "@/features/courses/CoursesPage";
import { absoluteSiteUrl, courseListJsonLd, siteName, siteOgImage, siteOgImageAlt } from "@/lib/siteMetadata";
import type { Metadata } from "next";

const coursesTitle = "여주 자전거 투어 코스 안내";
const coursesDescription =
  "한글길 이야기 코스, 한글길 수수께끼 코스, K-컬쳐 코스, 바이크 챌린지 코스로 즐기는 여주 자전거 시티투어 코스 안내입니다.";
const coursesUrl = absoluteSiteUrl("/courses/");

export const metadata: Metadata = {
  title: coursesTitle,
  description: coursesDescription,
  alternates: {
    canonical: coursesUrl,
  },
  openGraph: {
    title: `${coursesTitle} | ${siteName}`,
    description: coursesDescription,
    url: coursesUrl,
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

export default function Courses() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseListJsonLd()),
        }}
      />
      <CoursesPage />
    </>
  );
}
