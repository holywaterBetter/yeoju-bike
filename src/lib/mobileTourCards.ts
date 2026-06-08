import { courseAnchorHref, courseAnchors, type CourseAnchor } from "./courseAnchors";
import { withBasePath } from "./sitePaths";

export type MobileTourCard = {
  anchor: CourseAnchor;
  plainTitle: string;
  titleLines: string[];
  courseHref: string;
  imageSrc: string;
  cropClassName: "cardHangulImage" | "cardGoldenImage" | "cardKYeojuImage" | "cardClubImage";
  gradientClassName: "gradientBlack" | "gradientOlive" | "gradientGreen" | "gradientBrown";
};

export const mobileTourCards: MobileTourCard[] = [
  {
    anchor: courseAnchors.hangul,
    plainTitle: "따르릉 여주 한글길 투어",
    titleLines: ["따르릉", "여주 한글길 투어"],
    courseHref: courseAnchorHref(courseAnchors.hangul),
    imageSrc: withBasePath("/assets/figma/mobile/tour-card-hangul.png"),
    cropClassName: "cardHangulImage",
    gradientClassName: "gradientBlack",
  },
  {
    anchor: courseAnchors.goldenBell,
    plainTitle: "남한강 골든벨 투어",
    titleLines: ["남한강", "골든벨 투어"],
    courseHref: courseAnchorHref(courseAnchors.goldenBell),
    imageSrc: withBasePath("/assets/figma/mobile/tour-card-golden.png"),
    cropClassName: "cardGoldenImage",
    gradientClassName: "gradientOlive",
  },
  {
    anchor: courseAnchors.kYeoju,
    plainTitle: "K-여주 바이크 투어",
    titleLines: ["K-여주", "바이크 투어"],
    courseHref: courseAnchorHref(courseAnchors.kYeoju),
    imageSrc: withBasePath("/assets/figma/mobile/tour-card-k-yeoju.png"),
    cropClassName: "cardKYeojuImage",
    gradientClassName: "gradientGreen",
  },
  {
    anchor: courseAnchors.club,
    plainTitle: "따르릉 동호회 코스",
    titleLines: ["따르릉", "동호회 코스"],
    courseHref: courseAnchorHref(courseAnchors.club),
    imageSrc: withBasePath("/assets/figma/mobile/tour-card-club.png"),
    cropClassName: "cardClubImage",
    gradientClassName: "gradientBrown",
  },
];
