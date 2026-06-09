import { courseAnchors, type CourseAnchor } from "./courseAnchors";
import { getTourReservationUrl, tourCatalog } from "./tours";
import { kakaoChannelUrl } from "./tourLinks";

export const siteDisplayDomain = "www.여주자전거시티투어.com";
export const siteDomain = "www.xn--v69a683bo5blg28e5tag8cz18antb.com";
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

export const seoTours = tourCatalog.map((tour) => ({
  anchor: tour.anchor,
  name: tour.plainTitle,
  description: tour.seo.description,
  audience: tour.seo.audience,
  duration: tour.seo.duration,
  serviceType: tour.seo.serviceType,
}));

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
