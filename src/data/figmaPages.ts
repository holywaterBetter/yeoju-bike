export type FigmaPageKey = "landing" | "courses" | "reservation";

export type FigmaPage = {
  key: FigmaPageKey;
  route: string;
  title: string;
  nodeId: string;
  width: number;
  height: number;
  imageSrc: string;
  description: string;
};

export const figmaPages: Record<FigmaPageKey, FigmaPage> = {
  landing: {
    key: "landing",
    route: "/",
    title: "투어 소개",
    nodeId: "1:52",
    width: 1440,
    height: 5693,
    imageSrc: "/assets/figma/reference/01-landing.png",
    description:
      "가이드와 함께 전기 자전거로 달리는 여주 시티투어 소개 페이지"
  },
  courses: {
    key: "courses",
    route: "/courses",
    title: "코스 안내",
    nodeId: "24:253",
    width: 1440,
    height: 8472,
    imageSrc: "/assets/figma/reference/02-courses.png",
    description: "따르릉 여주 한글길 투어와 여러 코스 안내 페이지"
  },
  reservation: {
    key: "reservation",
    route: "/reservation",
    title: "투어 예약",
    nodeId: "38:860",
    width: 1440,
    height: 2415,
    imageSrc: "/assets/figma/reference/04-reservation.png",
    description: "투어 예약 코스 선택과 따르릉으로 오시는 길 안내 페이지"
  }
};
