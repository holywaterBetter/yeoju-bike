import { courseAnchorHref, courseAnchors, type CourseAnchor } from "./courseAnchors";
import { withBasePath } from "./sitePaths";

export type TourSeo = {
  description: string;
  audience: string;
  duration: string;
  serviceType: string;
};

export type TourCatalogItem = {
  anchor: CourseAnchor;
  title: string;
  courseHref: string;
  landingMedia: {
    desktop: string;
    mobile: string;
  };
  cardNewsSlides: readonly [string, string, string, string, string];
  booking: {
    href: string;
    kind: "eventus" | "kakao";
    ariaLabel: string;
  };
  seo: TourSeo;
};

export const tourCatalog: readonly TourCatalogItem[] = [
  {
    anchor: courseAnchors.hangul,
    title: "한글길 해설 투어",
    courseHref: courseAnchorHref(courseAnchors.hangul),
    landingMedia: {
      desktop: withBasePath("/assets/figma/groups/tour-card-golden-media.webp"),
      mobile: withBasePath("/assets/figma/mobile/landing-journey-card-hangul.webp"),
    },
    cardNewsSlides: [
      withBasePath("/assets/figma/260906/card-news/hangul-01.webp"),
      withBasePath("/assets/figma/260906/card-news/hangul-02.webp"),
      withBasePath("/assets/figma/260906/card-news/hangul-03.webp"),
      withBasePath("/assets/figma/260906/card-news/hangul-04.webp"),
      withBasePath("/assets/figma/260906/card-news/hangul-05.webp"),
    ],
    booking: {
      href: "https://event-us.kr/yeojubiketour/event/133588",
      kind: "eventus",
      ariaLabel: "한글길 해설 투어 예약하기",
    },
    seo: {
      description: "세종대왕과 한글의 이야기를 따라 여주의 역사와 문화를 만나는 가이드형 전기자전거 해설 투어입니다.",
      audience: "여주의 역사와 문화를 여유롭게 즐기고 싶은 여행객",
      duration: "약 5시간",
      serviceType: "한글길 해설 투어",
    },
  },
  {
    anchor: courseAnchors.goldenBell,
    title: "여주 골든벨 투어",
    courseHref: courseAnchorHref(courseAnchors.goldenBell),
    landingMedia: {
      desktop: withBasePath("/assets/figma/groups/tour-card-hangul-media.webp"),
      mobile: withBasePath("/assets/figma/mobile/landing-journey-card-golden.webp"),
    },
    cardNewsSlides: [
      withBasePath("/assets/figma/260906/card-news/golden-bell-01.webp"),
      withBasePath("/assets/figma/260906/card-news/golden-bell-02.webp"),
      withBasePath("/assets/figma/260906/card-news/golden-bell-03.webp"),
      withBasePath("/assets/figma/260906/card-news/golden-bell-04.webp"),
      withBasePath("/assets/figma/260906/card-news/golden-bell-05.webp"),
    ],
    booking: {
      href: "https://event-us.kr/yeojubiketour/event/133605",
      kind: "eventus",
      ariaLabel: "여주 골든벨 투어 예약하기",
    },
    seo: {
      description: "남한강변을 달리며 여주의 역사와 문화에 관한 퀴즈를 즐기는 가이드형 에듀테인먼트 전기자전거 투어입니다.",
      audience: "아이와 함께 특별한 여주 여행 코스를 찾는 가족 여행객",
      duration: "약 30분",
      serviceType: "여주 골든벨 투어",
    },
  },
  {
    anchor: courseAnchors.kYeoju,
    title: "Yeoju K-Culture Trail",
    courseHref: courseAnchorHref(courseAnchors.kYeoju),
    landingMedia: {
      desktop: withBasePath("/assets/figma/groups/tour-card-k-yeoju-media.webp"),
      mobile: withBasePath("/assets/figma/mobile/landing-journey-card-k-yeoju.webp"),
    },
    cardNewsSlides: [
      withBasePath("/assets/figma/260906/card-news/k-culture-01.webp"),
      withBasePath("/assets/figma/260906/card-news/k-culture-02.webp"),
      withBasePath("/assets/figma/260906/card-news/k-culture-03.webp"),
      withBasePath("/assets/figma/260906/card-news/k-culture-04.webp"),
      withBasePath("/assets/figma/260906/card-news/k-culture-05.webp"),
    ],
    booking: {
      href: "https://pf.kakao.com/_NxgwUn",
      kind: "kakao",
      ariaLabel: "Yeoju K-Culture Trail 카카오 채널로 문의하기",
    },
    seo: {
      description: "한국을 찾은 여행자가 여주의 전통과 로컬 문화를 자전거로 경험하는 글로벌 문화 투어입니다.",
      audience: "한국 로컬 문화를 체험하고 싶은 외국인 관광객",
      duration: "약 5시간",
      serviceType: "Yeoju K-Culture Trail",
    },
  },
  {
    anchor: courseAnchors.club,
    title: "여주 프리폰도",
    courseHref: courseAnchorHref(courseAnchors.club),
    landingMedia: {
      desktop: withBasePath("/assets/figma/groups/tour-card-club-media.webp"),
      mobile: withBasePath("/assets/figma/mobile/bike-challenge-course.webp"),
    },
    cardNewsSlides: [
      withBasePath("/assets/figma/260906/card-news/freefondo-01.webp"),
      withBasePath("/assets/figma/260906/card-news/freefondo-02.webp"),
      withBasePath("/assets/figma/260906/card-news/freefondo-03.webp"),
      withBasePath("/assets/figma/260906/card-news/freefondo-04.webp"),
      withBasePath("/assets/figma/260906/card-news/freefondo-05.webp"),
    ],
    booking: {
      href: "https://event-us.kr/yeojubiketour/event/133610",
      kind: "eventus",
      ariaLabel: "여주 프리폰도 예약하기",
    },
    seo: {
      description: "여주의 풍경과 명소를 자기 속도로 달리고 완주를 인증하는 자율 주행형 라이딩 프로그램입니다.",
      audience: "자전거 동호회와 단체 라이더",
      duration: "자유 주행",
      serviceType: "여주 프리폰도",
    },
  },
] as const;

export const tourReservationUrls = Object.fromEntries(
  tourCatalog.map((tour) => [tour.anchor, tour.booking.href]),
) as Record<CourseAnchor, string>;

export function getTourReservationUrl(anchor: CourseAnchor) {
  return tourReservationUrls[anchor];
}
