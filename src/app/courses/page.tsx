import CoursesPage from "@/features/courses/CoursesPage";
import { absoluteSiteUrl, courseListJsonLd, siteName } from "@/lib/siteMetadata";
import type { Metadata } from "next";

const coursesTitle = "여주 자전거 투어 코스 안내";
const coursesDescription =
  "한글길 투어, 남한강 골든벨 투어, K-여주 바이크 투어, 동호회 코스로 즐기는 여주 자전거 시티투어 코스 안내입니다.";
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
