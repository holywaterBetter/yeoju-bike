import { courseAnchorHref, courseAnchors, type CourseAnchor } from "./courseAnchors";
import { withBasePath } from "./sitePaths";

export type MobileTourCard = {
  anchor: CourseAnchor;
  plainTitle: string;
  titleLines: string[];
  courseHref: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  figmaMediaImageSrc?: string;
  figmaMediaImageWidth?: number;
  figmaMediaImageHeight?: number;
  reservationImageSrc?: string;
  reservationImageWidth?: number;
  reservationImageHeight?: number;
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
    plainTitle: "한글길 이야기 코스 (Story Course)",
    titleLines: ["한글길 이야기 코스", "(Story Course)"],
    courseHref: courseAnchorHref(courseAnchors.hangul),
    reservationUrl: "https://form.naver.com/response/v7niAyUhIlKeoY2YjUv2ww",
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-hangul-media.webp"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-hangul.webp"),
      imageWidth: 1440,
      imageHeight: 1080,
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-hangul.webp"),
      figmaMediaImageWidth: 168,
      figmaMediaImageHeight: 172,
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-hangul.webp"),
      reservationImageWidth: 1440,
      reservationImageHeight: 1080,
      cropClassName: "cardHangulImage",
      gradientClassName: "gradientBlack",
    },
    seo: {
      description: "여주의 숨은 역사와 문화를 초성 순서대로 만나는 가이드형 인문 해설 전기자전거 투어입니다.",
      audience: "여주의 역사와 문화를 여유롭게 즐기고 싶은 여행객",
      duration: "약 5시간",
      serviceType: "한글길 이야기 코스",
    },
  },
  {
    anchor: courseAnchors.goldenBell,
    plainTitle: "한글길 수수께끼 코스 (Quiz Course)",
    titleLines: ["한글길 수수께끼 코스", "(Quiz Course)"],
    courseHref: courseAnchorHref(courseAnchors.goldenBell),
    reservationUrl: "https://form.naver.com/response/zN4F5ETAfQtFaA7o8z5uUQ",
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-golden-media.webp"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-golden.webp"),
      imageWidth: 1440,
      imageHeight: 813,
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-golden.webp"),
      figmaMediaImageWidth: 168,
      figmaMediaImageHeight: 172,
      cropClassName: "cardGoldenImage",
      gradientClassName: "gradientOlive",
    },
    seo: {
      description: "강변공원을 달리며 유쾌한 초성 퀴즈를 푸는 가이드형 에듀테인먼트 전기자전거 투어입니다.",
      audience: "아이와 함께 특별한 여주 여행 코스를 찾는 가족 여행객",
      duration: "약 30분",
      serviceType: "한글길 수수께끼 코스",
    },
  },
  {
    anchor: courseAnchors.kYeoju,
    plainTitle: "K-컬쳐 코스 (K-Culture Course)",
    titleLines: ["K-컬쳐 코스", "(K-Culture Course)"],
    courseHref: courseAnchorHref(courseAnchors.kYeoju),
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-k-yeoju-media.webp"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-k-yeoju.webp"),
      imageWidth: 2048,
      imageHeight: 1152,
      figmaMediaImageSrc: withBasePath("/assets/figma/mobile/landing-journey-card-k-yeoju.webp"),
      figmaMediaImageWidth: 168,
      figmaMediaImageHeight: 172,
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-k.webp"),
      reservationImageWidth: 2048,
      reservationImageHeight: 1152,
      cropClassName: "cardKYeojuImage",
      gradientClassName: "gradientGreen",
    },
    seo: {
      description: "외국인을 대상으로 K-문화의 집합, 여주의 매력을 전하는 개발 중인 글로벌 전기자전거 투어입니다.",
      audience: "한국 로컬 문화를 체험하고 싶은 외국인 관광객",
      duration: "약 5시간",
      serviceType: "K-컬쳐 코스",
    },
  },
  {
    anchor: courseAnchors.club,
    plainTitle: "바이크 챌린지 코스 (Challenge Course)",
    titleLines: ["바이크 챌린지 코스", "(Challenge Course)"],
    courseHref: courseAnchorHref(courseAnchors.club),
    desktopCardMedia: withBasePath("/assets/figma/groups/tour-card-club-media.webp"),
    mobileCard: {
      imageSrc: withBasePath("/assets/figma/mobile/tour-card-club.webp"),
      imageWidth: 1080,
      imageHeight: 810,
      reservationImageSrc: withBasePath("/assets/figma/mobile/reservation-card-club.webp"),
      reservationImageWidth: 1080,
      reservationImageHeight: 810,
      cropClassName: "cardClubImage",
      gradientClassName: "gradientBrown",
    },
    seo: {
      description: "동호인을 위한 가이드 없는 자율 완주 인증 방식의 개발 중인 추천 라이딩 투어입니다.",
      audience: "자전거 동호회와 단체 라이더",
      duration: "자유 주행",
      serviceType: "바이크 챌린지 코스",
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
