import { courseAnchorHref, courseAnchors, type CourseAnchor } from "./courseAnchors";
import { withBasePath } from "./sitePaths";

export type MobileTourCard = {
  anchor: CourseAnchor;
  plainTitle: string;
  titleLines: string[];
  courseHref: string;
  imageSrc: string;
  figmaMediaImageSrc?: string;
  reservationImageSrc?: string;
  hasEmbeddedTitle?: boolean;
  cropClassName: "cardHangulImage" | "cardGoldenImage" | "cardKYeojuImage" | "cardClubImage";
  gradientClassName: "gradientBlack" | "gradientOlive" | "gradientGreen" | "gradientBrown";
};

export type TourCatalogItem = {
  anchor: CourseAnchor;
  plainTitle: string;
  titleLines: string[];
  courseHref: string;
  reservationUrl?: string;
  desktopCardMedia: string;
  mobileCard: Omit<MobileTourCard, "anchor" | "plainTitle" | "titleLines" | "courseHref">;
  seo: {
    description: string;
    audience: string;
    duration: string;
    serviceType: string;
  };
};

export const tourCatalog: TourCatalogItem[] = [
  {
    anchor: courseAnchors.hangul,
    plainTitle: "따르릉 여주 한글길 투어",
    titleLines: ["따르릉", "여주 한글길 투어"],
    courseHref: courseAnchorHref(courseAnchors.hangul),
    reservationUrl: "https://form.naver.com/response/v7niAyUhIlKeoY2YjUv2ww",
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-hangul-media.png"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-hangul.png"),
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-hangul.png"),
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-hangul.png"),
      cropClassName: "cardHangulImage",
      gradientClassName: "gradientBlack",
    },
    seo: {
      description: "금은모래캠핑장에서 한글시장까지 여주의 역사와 문화를 따라 달리는 시그니처 전기자전거 투어입니다.",
      audience: "여주의 역사와 문화를 여유롭게 즐기고 싶은 여행객",
      duration: "약 5시간",
      serviceType: "여주 자전거 시티투어",
    },
  },
  {
    anchor: courseAnchors.goldenBell,
    plainTitle: "남한강 골든벨 투어",
    titleLines: ["남한강", "골든벨 투어"],
    courseHref: courseAnchorHref(courseAnchors.goldenBell),
    reservationUrl: "https://form.naver.com/response/zN4F5ETAfQtFaA7o8z5uUQ",
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-golden-media.png"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-golden.png"),
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-golden.png"),
      cropClassName: "cardGoldenImage",
      gradientClassName: "gradientOlive",
    },
    seo: {
      description: "남한강변 자전거길을 달리며 여주 퀴즈와 촬영 미션을 함께 즐기는 가족형 액티비티 투어입니다.",
      audience: "아이와 함께 특별한 여주 여행 코스를 찾는 가족 여행객",
      duration: "약 30분",
      serviceType: "남한강 자전거길 투어",
    },
  },
  {
    anchor: courseAnchors.kYeoju,
    plainTitle: "K-여주 바이크 투어",
    titleLines: ["K-여주", "바이크 투어"],
    courseHref: courseAnchorHref(courseAnchors.kYeoju),
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-k-yeoju-media.png"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-k-yeoju.png"),
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-k-yeoju.png"),
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-k.png"),
      cropClassName: "cardKYeojuImage",
      gradientClassName: "gradientGreen",
    },
    seo: {
      description: "남한강 자전거길, 여주 도자기 문화, 한국적인 로컬 경험을 묶은 외국인 맞춤형 바이크 투어입니다.",
      audience: "한국 로컬 문화를 체험하고 싶은 외국인 관광객",
      duration: "약 5시간",
      serviceType: "전기자전거 투어",
    },
  },
  {
    anchor: courseAnchors.club,
    plainTitle: "따르릉 동호회 코스",
    titleLines: ["따르릉", "동호회 코스"],
    courseHref: courseAnchorHref(courseAnchors.club),
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-club-media.png"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-club.png"),
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-club.png"),
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-club.png"),
      hasEmbeddedTitle: true,
      cropClassName: "cardClubImage",
      gradientClassName: "gradientBrown",
    },
    seo: {
      description: "동호회원들이 여주의 남한강 자전거길을 자유롭게 달릴 수 있도록 추천 코스맵을 제공하는 자율 라이딩 코스입니다.",
      audience: "자전거 동호회와 단체 라이더",
      duration: "자유 주행",
      serviceType: "여주 자전거 투어",
    },
  },
];

export const tourReservationUrls: Partial<Record<CourseAnchor, string>> = Object.fromEntries(
  tourCatalog.flatMap((tour) => (tour.reservationUrl ? [[tour.anchor, tour.reservationUrl]] : [])),
) as Partial<Record<CourseAnchor, string>>;

export function getTourReservationUrl(anchor: CourseAnchor) {
  return tourReservationUrls[anchor];
}

export function toMobileTourCard(tour: TourCatalogItem): MobileTourCard {
  return {
    anchor: tour.anchor,
    plainTitle: tour.plainTitle,
    titleLines: tour.titleLines,
    courseHref: tour.courseHref,
    ...tour.mobileCard,
  };
}
