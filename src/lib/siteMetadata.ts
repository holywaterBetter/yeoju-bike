import { courseAnchors, type CourseAnchor } from "./courseAnchors";
import { getTourReservationUrl, kakaoChannelUrl } from "./tourLinks";

export const siteDomain = "www.여주자전거시티투어.com";
export const siteUrl = `https://${siteDomain}/`;
export const siteName = "따르릉 여주 시티투어";
export const siteTitle = "여주 자전거 시티투어";
export const siteDescription =
  "남한강 자전거길과 여주 여행 코스를 전기자전거로 달리는 가이드 동행 여주 자전거 시티투어입니다.";
export const siteKeywords = [
  "여주 자전거 시티투어",
  "여주 자전거 투어",
  "남한강 자전거길",
  "여주 여행 코스",
  "전기자전거 투어",
];

export const siteAddress = {
  streetAddress: "강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방",
  addressLocality: "여주시",
  addressRegion: "경기도",
  addressCountry: "KR",
};

export const seoTours: {
  anchor: CourseAnchor;
  name: string;
  description: string;
  audience: string;
  duration: string;
  serviceType: string;
}[] = [
  {
    anchor: courseAnchors.hangul,
    name: "따르릉 여주 한글길 투어",
    description: "금은모래캠핑장에서 한글시장까지 여주의 역사와 문화를 따라 달리는 시그니처 전기자전거 투어입니다.",
    audience: "여주의 역사와 문화를 여유롭게 즐기고 싶은 여행객",
    duration: "약 5시간",
    serviceType: "여주 자전거 시티투어",
  },
  {
    anchor: courseAnchors.goldenBell,
    name: "남한강 골든벨 투어",
    description: "남한강변 자전거길을 달리며 여주 퀴즈와 촬영 미션을 함께 즐기는 가족형 액티비티 투어입니다.",
    audience: "아이와 함께 특별한 여주 여행 코스를 찾는 가족 여행객",
    duration: "약 30분",
    serviceType: "남한강 자전거길 투어",
  },
  {
    anchor: courseAnchors.kYeoju,
    name: "K-여주 바이크 투어",
    description: "남한강 자전거길, 여주 도자기 문화, 한국적인 로컬 경험을 묶은 외국인 맞춤형 바이크 투어입니다.",
    audience: "한국 로컬 문화를 체험하고 싶은 외국인 관광객",
    duration: "약 5시간",
    serviceType: "전기자전거 투어",
  },
  {
    anchor: courseAnchors.club,
    name: "따르릉 동호회 코스",
    description: "동호회원들이 여주의 남한강 자전거길을 자유롭게 달릴 수 있도록 추천 코스맵을 제공하는 자율 라이딩 코스입니다.",
    audience: "자전거 동호회와 단체 라이더",
    duration: "자유 주행",
    serviceType: "여주 자전거 투어",
  },
];

export function absoluteSiteUrl(path = "/") {
  if (path === "/" || path === "") {
    return siteUrl;
  }

  return `${siteUrl}${path.replace(/^\//, "")}`;
}

export function courseSiteUrl(anchor: CourseAnchor) {
  if (anchor === courseAnchors.hangul) {
    return absoluteSiteUrl("/courses/");
  }

  return absoluteSiteUrl(`/courses/#${anchor}`);
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#local-business`,
    name: siteName,
    alternateName: siteTitle,
    url: siteUrl,
    image: absoluteSiteUrl("/assets/figma/groups/landing-hero-group.png"),
    description: siteDescription,
    keywords: siteKeywords.join(", "),
    address: {
      "@type": "PostalAddress",
      ...siteAddress,
    },
    areaServed: {
      "@type": "City",
      name: "여주시",
    },
    sameAs: [kakaoChannelUrl],
    makesOffer: seoTours.map((tour) => ({
      "@type": "Offer",
      url: getTourReservationUrl(tour.anchor) ?? absoluteSiteUrl("/reservation/"),
      itemOffered: {
        "@type": "TouristTrip",
        name: tour.name,
        url: courseSiteUrl(tour.anchor),
        description: tour.description,
        touristType: tour.audience,
        provider: {
          "@id": `${siteUrl}#local-business`,
        },
      },
    })),
  };
}

export function courseListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteSiteUrl("/courses/")}#tour-list`,
    name: "여주 자전거 시티투어 코스",
    itemListElement: seoTours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": ["Service", "TouristTrip"],
        name: tour.name,
        url: courseSiteUrl(tour.anchor),
        description: tour.description,
        serviceType: tour.serviceType,
        touristType: tour.audience,
        duration: tour.duration,
        areaServed: {
          "@type": "City",
          name: "여주시",
        },
        provider: {
          "@id": `${siteUrl}#local-business`,
        },
      },
    })),
  };
}
