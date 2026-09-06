import CoursesPage from "@/features/courses/CoursesPage";
import { courseListJsonLd, localBusinessJsonLd, openGraphMetadata, siteUrl, twitterMetadata } from "@/lib/siteMetadata";
import type { Metadata } from "next";

const coursesTitle = "여주 자전거 투어 코스 & 예약";
const coursesDescription =
  "한글길 해설 투어, 여주 골든벨 투어, Yeoju K-Culture Trail, 여주 프리폰도의 카드뉴스와 예약 링크를 확인하세요.";

export const metadata: Metadata = {
  title: coursesTitle,
  description: coursesDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: openGraphMetadata(coursesTitle, coursesDescription, siteUrl),
  twitter: twitterMetadata(coursesTitle, coursesDescription),
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
