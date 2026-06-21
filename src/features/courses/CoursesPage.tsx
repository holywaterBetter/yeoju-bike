import MobileSiteHeader from "@/components/MobileSiteHeader";
import RevealOnScroll from "@/components/RevealOnScroll";
import { eagerImageAttrs, lazyImageAttrs } from "@/lib/imageAttrs";
import { withBasePath } from "@/lib/sitePaths";
import { type CourseAnchor, courseAnchors } from "@/lib/courseAnchors";
import { getTourReservationUrl } from "@/lib/tourLinks";
import CourseHashScroller from "./CourseHashScroller";
import styles from "./CoursesPage.module.css";

type CoursesPageProps = {
  className?: string;
};

type PositionedMedia = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type CourseDecoration = "hangulLetters" | "bell" | "taegeuk" | "bike" | "gift";

type TourSection = {
  anchor: CourseAnchor;
  nodeId: string;
  title: string | string[];
  mobileTitle?: string | string[];
  titleWidth: number;
  decoration?: CourseDecoration;
  badges: string[];
  mobileBadges?: string[];
  subtitle: string;
  mobileSubtitle?: string;
  body: string[];
  audience: string[];
  duration: string[];
  heroHeight: number;
  heroImages?: PositionedMedia[];
  gallery?: {
    left: PositionedMedia[];
    right: PositionedMedia[];
  };
  map?: boolean;
};

const assets = {
  logo: withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png"),
  hangulLetters: withBasePath("/assets/figma/groups/courses-hangul-letters.png"),
  bell: withBasePath("/assets/figma/groups/courses-bell.png"),
  taegeuk: withBasePath("/assets/figma/groups/courses-taegeuk.png"),
  bikeDecoration: withBasePath("/assets/figma/groups/courses-bike-decoration.png"),
  giftDecoration: withBasePath("/assets/figma/groups/courses-gift-decoration.png"),
  hangulHeroFrame: withBasePath("/assets/figma/groups/courses-hangul-hero-frame.webp"),
  geumeunCampingFrame: withBasePath("/assets/figma/groups/courses-geumeun-camping-frame.webp"),
  marketGateFrame: withBasePath("/assets/figma/groups/courses-market-gate-frame.webp"),
  goldenBellHeroFrame: withBasePath("/assets/figma/groups/courses-golden-hero-frame.webp"),
  goldenBellGalleryLeftFrame: withBasePath("/assets/figma/groups/courses-golden-gallery-left-frame.webp"),
  goldenBellGalleryRightFrame: withBasePath("/assets/figma/groups/courses-golden-gallery-right-frame.webp"),
  kYeojuHeroFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-hero-frame.webp"),
  kYeojuGalleryLeftFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-gallery-left-frame.webp"),
  kYeojuGalleryRightFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-gallery-right-frame.webp"),
  clubMapFrame: withBasePath("/assets/figma/groups/courses-club-map-frame.webp"),
  giftMask: withBasePath("/assets/figma/mcp/93cbe394-9c05-4d99-8f39-3f425e6a6e0d.svg"),
  giftOvalBlue: withBasePath("/assets/figma/mcp/261415ef-f7ad-469f-a2bb-df9d47e5b520.svg"),
  giftKeyring: withBasePath("/assets/figma/mcp/42cef7f0-21d9-486d-b54f-03929f4fee80.svg"),
  giftOvalYellow: withBasePath("/assets/figma/mcp/a44d3d69-27a3-4600-8d86-50bfbf9b607d.svg"),
  giftCamera: withBasePath("/assets/figma/mcp/e404ea38-5482-46ba-8e86-274235ce055d.svg"),
  giftClickerKeyring: withBasePath("/assets/figma/mcp/35e38e5b-16ab-4234-b890-f589852d9635.svg"),
  giftPottery: withBasePath("/assets/figma/mcp/4745acfa-e7a7-4c39-a23a-3b415f48cf3b.svg"),
  giftTshirt: withBasePath("/assets/figma/mcp/gift-tshirt.svg"),
};

const mobileAssets = {
  hangulHero: withBasePath("/assets/figma/mobile/courses-hangul-hero.webp"),
  hangulLettersDecoration: withBasePath("/assets/figma/mobile/courses-hangul-letters-decoration.png"),
  bellDecoration: withBasePath("/assets/figma/mobile/courses-bell-decoration.png"),
  taegeukDecoration: withBasePath("/assets/figma/mobile/courses-taegeuk-decoration.png"),
  bikeDecoration: withBasePath("/assets/figma/mobile/courses-bike-decoration.png"),
  giftDecoration: withBasePath("/assets/figma/mobile/courses-gift-decoration.png"),
  market: withBasePath("/assets/figma/mobile/courses-market.webp"),
  goldenLeft: withBasePath("/assets/figma/mobile/courses-golden-left.webp"),
  goldenRightA: withBasePath("/assets/figma/mobile/courses-golden-right-a.webp"),
  goldenRightB: withBasePath("/assets/figma/mobile/courses-golden-right-b.webp"),
  kHero: withBasePath("/assets/figma/mobile/courses-k-hero.webp"),
  kBoat: withBasePath("/assets/figma/mobile/courses-k-boat.webp"),
  kRice: withBasePath("/assets/figma/mobile/courses-k-rice.webp"),
  clubMapRoute: withBasePath("/assets/figma/mobile/courses-club-map-route.webp"),
};

const courseDecorationConfigs = {
  hangulLetters: {
    desktop: { src: assets.hangulLetters, className: styles.hangulLettersDecoration, width: 394, height: 154 },
    mobile: { src: mobileAssets.hangulLettersDecoration, className: styles.mobileHangulLettersDecoration, width: 237, height: 92 },
    dataNodeId: "24:123",
  },
  bell: {
    desktop: { src: assets.bell, className: styles.bellDecoration, width: 195, height: 154 },
    mobile: { src: mobileAssets.bellDecoration, className: styles.mobileBellDecoration, width: 117, height: 93 },
    dataNodeId: "28:148",
    dataName: "종",
  },
  taegeuk: {
    desktop: { src: assets.taegeuk, className: styles.taegeukDecoration, width: 108, height: 113 },
    mobile: { src: mobileAssets.taegeukDecoration, className: styles.mobileTaegeukDecoration, width: 65, height: 68 },
    dataNodeId: "28:206",
    dataName: "태극기",
  },
  bike: {
    desktop: { src: assets.bikeDecoration, className: styles.bikeDecoration, width: 233, height: 152 },
    mobile: { src: mobileAssets.bikeDecoration, className: styles.mobileBikeDecoration, width: 140, height: 91 },
    dataNodeId: "28:169",
    dataName: "자전거",
  },
  gift: {
    desktop: { src: assets.giftDecoration, className: styles.giftDecoration, width: 143, height: 156 },
    mobile: { src: mobileAssets.giftDecoration, className: styles.mobileGiftDecoration, width: 86, height: 94 },
    dataNodeId: "31:453",
    dataName: "선물",
  },
} satisfies Record<
  CourseDecoration,
  {
    desktop: { src: string; className: string; width: number; height: number };
    mobile: { src: string; className: string; width: number; height: number };
    dataNodeId?: string;
    dataName?: string;
  }
>;

const sections: TourSection[] = [
  {
    anchor: courseAnchors.hangul,
    nodeId: "23:896",
    title: ["한글길 이야기 코스", "Story Course"],
    titleWidth: 632,
    decoration: "hangulLetters",
    badges: ["가이드형"],
    subtitle: "여주의 숨은 역사와 문화를 초성 순서대로 만나는 인문 해설 투어",
    body: [
      "금은모래캠핑장(ㄱ)에서 출발해 한글시장(ㅎ)까지 시그니처 투어입니다.",
      "영월루, 세종대왕릉 등 아름다운 풍경 속에 숨겨진 여주의 역사와 문화 이야기를 따르릉 가이드의 재미있는 해설로 만나보세요.",
    ],
    audience: [
      "여주의 역사와 문화를 여유롭게 즐기고 싶은 분, 연인, 친구",
      "만 13세 이상 (전기자전거 탑승으로 13세 미만은 참여 불가)",
    ],
    duration: ["오전 10시 ~ 오후 3시 (소요 시간 약 5시간)"],
    heroHeight: 619,
    heroImages: [
      {
        src: assets.hangulHeroFrame,
        alt: "한글길 이야기 코스 카드 거치대",
        left: 0,
        top: 0,
        width: 1200,
        height: 619,
      },
    ],
    gallery: {
      left: [
        {
          src: assets.geumeunCampingFrame,
          alt: "금은모래캠핑장",
          left: 0,
          top: 0,
          width: 600,
          height: 324,
        },
      ],
      right: [
        {
          src: assets.marketGateFrame,
          alt: "한글시장 입구",
          left: 0,
          top: 0,
          width: 560,
          height: 324,
        },
      ],
    },
  },
  {
    anchor: courseAnchors.goldenBell,
    nodeId: "24:156",
    title: ["한글길 수수께끼 코스", "Quiz Course"],
    titleWidth: 632,
    decoration: "bell",
    badges: ["가이드형", "개발중"],
    subtitle: "강변 공원을 달리며 유쾌한 초성 퀴즈를 푸는 에듀테인먼트 투어",
    body: [
      "시원한 남한강변을 달리며 중간중간 주어지는 여주 관련 퀴즈를 풀어보는 참여형 액티비티 코스입니다. ",
      "가족이 함께 힘을 합쳐 문제를 풀고, 드론 촬영으로 평생 남을 특별한 추억도 남겨보세요.",
    ],
    audience: ["아이와 함께 특별한 체험을 원하는 가족 단위 여행객"],
    duration: ["약 30분"],
    heroHeight: 619,
    heroImages: [
      {
        src: assets.goldenBellHeroFrame,
        alt: "한글길 수수께끼 코스 라이딩 배경",
        left: 0,
        top: 0,
        width: 1200,
        height: 619,
      },
    ],
    gallery: {
      left: [
        {
          src: assets.goldenBellGalleryLeftFrame,
          alt: "남한강 공원",
          left: 0,
          top: 0,
          width: 600,
          height: 324,
        },
      ],
      right: [
        {
          src: assets.goldenBellGalleryRightFrame,
          alt: "남한강 산책길",
          left: 0,
          top: 0,
          width: 560,
          height: 324,
        },
      ],
    },
  },
  {
    anchor: courseAnchors.kYeoju,
    nodeId: "24:183",
    title: ["K-컬쳐 코스", "K-Culture Course"],
    titleWidth: 632,
    decoration: "taegeuk",
    badges: ["가이드형", "개발중"],
    subtitle: "외국인을 대상으로 K-문화의 집합, 여주의 매력을 전하는 글로벌 투어",
    body: [
      "한국의 아름다움을 만끽하고 싶은 외국인 방문객을 위한 맞춤형 글로벌 코스입니다. 평화로운 남한강 자전거길을 달리며",
      "한국의 아름다운 자연을 느끼고, 여주 도자기 문화를 접하며 한국의 전통매력에 깊이 빠져드는 시간을 선사합니다.",
    ],
    audience: [
      "한국 로컬 문화를 체험하고 싶은 외국인 관광객",
      "외국인 친구와 동행하는 분",
      "(영어, 일본어가 가능한 가이드가 안내해드립니다)",
    ],
    duration: ["약 5시간"],
    heroHeight: 619,
    heroImages: [
      {
        src: assets.kYeojuHeroFrame,
        alt: "여주 도자기 체험",
        left: 0,
        top: 0,
        width: 1200,
        height: 619,
      },
    ],
    gallery: {
      left: [
        {
          src: assets.kYeojuGalleryLeftFrame,
          alt: "황포돛배",
          left: 0,
          top: 0,
          width: 600,
          height: 324,
        },
      ],
      right: [
        {
          src: assets.kYeojuGalleryRightFrame,
          alt: "유색벼 논 그림",
          left: 0,
          top: 0,
          width: 560,
          height: 324,
        },
      ],
    },
  },
  {
    anchor: courseAnchors.club,
    nodeId: "24:423",
    title: ["바이크 챌린지 코스", "Challenge Course"],
    titleWidth: 632,
    decoration: "bike",
    badges: ["가이드형", "개발중"],
    subtitle: "동호인을 위한 가이드 없는 자율 완주 인증 라이딩 투어",
    body: [
      "가이드 동행 없이 동호회원들끼리 자유롭게 여주의 아름다운 자전거길을 달리는 자율 주행 코스입니다. ",
      "따르릉이 추천하는 코스를 따라 남한강의 시원한 바람과 탁 트인 풍경을 오롯이 느끼며 그룹 라이딩의 쾌감을 만끽해보세요. ",
    ],
    audience: ["자전거 동호회", "우리끼리 자유로운 라이딩을 원하는 단체"],
    duration: ["자유 ", "(추천 코스맵 제공)"],
    heroHeight: 734,
    map: true,
  },
];

const desktopGifts = [
  {
    title: "자전거 라이딩 마스크",
    course: "한글길 이야기 코스",
    icon: <img className={styles.iconImage} src={assets.giftMask} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
  {
    title: "한글 가챠 키링 만들기",
    course: "한글길 이야기 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalBlue} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.keyringIcon} src={assets.giftKeyring} alt="" width={25} height={41} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "스냅샷 & 드론 영상 촬영",
    course: "한글길 수수께끼 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.cameraIcon} src={assets.giftCamera} alt="" width={31} height={24} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "한글 클릭커 키링 만들기",
    course: "한글길 수수께끼 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.clickerKeyringIcon} src={assets.giftClickerKeyring} alt="" width={27} height={42} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "여주 도자기 기념품",
    course: "K-컬쳐 코스",
    icon: <img className={styles.iconImage} src={assets.giftPottery} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
  {
    title: "완주 인증 티셔츠",
    course: "바이크 챌린지 코스",
    icon: <img className={styles.iconImage} src={assets.giftTshirt} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
];

const mobileGifts = [
  {
    title: "자전거 라이딩 마스크",
    course: "한글길 이야기 코스",
    icon: <img className={styles.iconImage} src={assets.giftMask} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
  {
    title: "한글 가챠 키링 만들기",
    course: "한글길 이야기 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalBlue} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.keyringIcon} src={assets.giftKeyring} alt="" width={25} height={41} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "스냅샷 & 드론 영상 촬영",
    course: "한글길 수수께끼 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.cameraIcon} src={assets.giftCamera} alt="" width={31} height={24} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "한글 클릭커 키링 만들기",
    course: "한글길 수수께끼 코스",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" width={69} height={69} {...lazyImageAttrs} />
        <img className={styles.clickerKeyringIcon} src={assets.giftClickerKeyring} alt="" width={27} height={42} {...lazyImageAttrs} />
      </span>
    ),
  },
  {
    title: "여주 도자기 기념품",
    course: "K-컬쳐 코스",
    icon: <img className={styles.iconImage} src={assets.giftPottery} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
  {
    title: "완주 인증 티셔츠",
    course: "바이크 챌린지 코스",
    icon: <img className={styles.iconImage} src={assets.giftTshirt} alt="" width={69} height={69} {...lazyImageAttrs} />,
  },
];

const mobileSectionMedia = [
  [
    [{ src: mobileAssets.hangulHero, alt: "여주 한글길 카드 거치대", className: styles.mobileHangulHeroImage, width: 1080, height: 1440 }],
    [{ src: assets.geumeunCampingFrame, alt: "금은모래캠핑장", className: styles.mobileGeumeunFrameImage, width: 600, height: 324 }],
    [{ src: mobileAssets.market, alt: "한글시장 입구", className: styles.mobileMarketImage, width: 600, height: 400 }],
  ],
  [
    [{ src: assets.goldenBellHeroFrame, alt: "한글길 수수께끼 코스 라이딩", className: styles.mobileGoldenHeroFrameImage, width: 1200, height: 619 }],
    [{ src: mobileAssets.goldenLeft, alt: "남한강 공원", className: styles.mobileGoldenLeftImage, width: 1440, height: 813 }],
    [
      { src: mobileAssets.goldenRightA, alt: "", className: styles.mobileGoldenRightImageA, width: 1440, height: 1080 },
      { src: mobileAssets.goldenRightB, alt: "남한강 산책길", className: styles.mobileGoldenRightImageB, width: 1440, height: 1081 },
    ],
  ],
  [
    [{ src: mobileAssets.kHero, alt: "여주 도자기 체험", className: styles.mobileKHeroImage, width: 1400, height: 370 }],
    [{ src: mobileAssets.kBoat, alt: "황포돛배", className: styles.mobileKBoatImage, width: 2048, height: 1152 }],
    [{ src: mobileAssets.kRice, alt: "유색벼 논 그림", className: styles.mobileKRiceImage, width: 4096, height: 2729 }],
  ],
] satisfies {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}[][][];

function PositionedMediaImage({ media }: { media: PositionedMedia }) {
  return (
    <img
      className={styles.positionedMediaImage}
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      style={{
        left: media.left,
        top: media.top,
        width: media.width,
        height: media.height,
      }}
      {...lazyImageAttrs}
    />
  );
}

function CourseDecorationImage({ decoration, mobile = false }: { decoration: CourseDecoration; mobile?: boolean }) {
  const config = courseDecorationConfigs[decoration];
  const asset = mobile ? config.mobile : config.desktop;
  const dataName = "dataName" in config ? config.dataName : undefined;

  return (
    <img
      className={`${styles.courseTitleDecoration} ${asset.className}`}
      src={asset.src}
      alt=""
      width={asset.width}
      height={asset.height}
      data-node-id={mobile ? undefined : config.dataNodeId}
      data-name={mobile ? undefined : dataName}
      {...lazyImageAttrs}
    />
  );
}

function SectionTitle({ title, width }: { title: string | string[]; width: number }) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <h2 className={styles.sectionTitle} style={{ width }}>
      {lines.map((line, index) => (
        <span className={index > 0 ? styles.sectionTitleSecondary : undefined} key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}

function BadgeList({ badges, className = "" }: { badges: string[]; className?: string }) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <div className={[styles.badgeList, className].filter(Boolean).join(" ")}>
      {badges.map((badge) => (
        <span className={[styles.courseBadge, getBadgeClassName(badge)].filter(Boolean).join(" ")} key={badge}>
          {badge}
        </span>
      ))}
    </div>
  );
}

function getBadgeClassName(badge: string) {
  if (badge === "가이드형") {
    return styles.courseBadgeGuided;
  }

  if (badge === "자율형") {
    return styles.courseBadgeSelfGuided;
  }

  if (badge === "개발중") {
    return styles.courseBadgePending;
  }

  return "";
}

function ReservationButton({ section }: { section: TourSection }) {
  const reservationUrl = getTourReservationUrl(section.anchor);

  if (!reservationUrl) {
    return (
      <span className={`${styles.reserveButton} ${styles.reserveButtonDisabled}`} aria-disabled="true">
        예약 하기
      </span>
    );
  }

  return (
    <a className={styles.reserveButton} href={reservationUrl}>
      예약 하기
    </a>
  );
}

function InfoColumn({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className={styles.infoColumn}>
      <h3>{heading}</h3>
      <div>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function TourSectionView({ section }: { section: TourSection }) {
  return (
    <section id={section.anchor} className={styles.tourSection} data-course-anchor={section.anchor} data-node-id={section.nodeId} data-reveal>
      <div className={styles.sectionIntro}>
        <div className={styles.titleGroup}>
          {section.decoration ? <CourseDecorationImage decoration={section.decoration} /> : null}
          <SectionTitle title={section.title} width={section.titleWidth} />
          <ReservationButton section={section} />
        </div>
        <div className={styles.copyGroup}>
          <div className={styles.summaryCopy}>
            <BadgeList badges={section.badges} />
            <h2>{section.subtitle}</h2>
            <div>
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className={styles.infoRow}>
            <InfoColumn heading="추천 대상" lines={section.audience} />
            <InfoColumn heading="소요시간" lines={section.duration} />
          </div>
        </div>
      </div>
      <div className={styles.heroClip} style={{ height: section.heroHeight }}>
        {section.map ? (
          <CourseMap />
        ) : (
          section.heroImages?.map((media) => <PositionedMediaImage key={`${media.src}-${media.top}`} media={media} />)
        )}
      </div>
      {section.gallery ? <Gallery gallery={section.gallery} /> : null}
    </section>
  );
}

function Gallery({ gallery }: { gallery: NonNullable<TourSection["gallery"]> }) {
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryLarge}>
        {gallery.left.map((crop) => (
          <PositionedMediaImage key={`${crop.src}-${crop.top}`} media={crop} />
        ))}
      </div>
      <div className={styles.gallerySmall}>
        {gallery.right.map((crop) => (
          <PositionedMediaImage key={`${crop.src}-${crop.top}`} media={crop} />
        ))}
      </div>
    </div>
  );
}

function CourseMap() {
  return (
    <div className={styles.mapRoot} data-node-id="32:535">
      <img className={styles.mapFrameImage} src={assets.clubMapFrame} alt="바이크 챌린지 코스 추천 지도" width={1200} height={734} {...lazyImageAttrs} />
    </div>
  );
}

function GiftSection() {
  return (
    <section className={styles.giftSection} data-node-id="30:215" data-reveal>
      <div className={styles.giftHeading}>
        <h2>
          <CourseDecorationImage decoration="gift" />
          <span>투어를 기념하는 특별한 선물</span>
        </h2>
        <p>코스마다 제공되는 선물이 다릅니다. </p>
      </div>
      <div className={styles.giftGrid}>
        {desktopGifts.map((gift) => (
          <article className={styles.giftCard} key={gift.title}>
            <div className={styles.giftIcon}>{gift.icon}</div>
            <h3>{gift.title}</h3>
            <p>{gift.course}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MobileSectionTitle({ section }: { section: TourSection }) {
  const title = section.mobileTitle ?? section.title;
  const lines = Array.isArray(title) ? title : [title];

  return (
    <h2 className={styles.mobileCourseTitle}>
      {lines.map((line) => (
        <span key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}

function MobileReserveButton({ section }: { section: TourSection }) {
  const reservationUrl = getTourReservationUrl(section.anchor);

  if (!reservationUrl) {
    return (
      <span className={`${styles.mobileReserveButton} ${styles.mobileReserveButtonDisabled}`} aria-disabled="true">
        <span>예약 하기</span>
      </span>
    );
  }

  return (
    <a className={styles.mobileReserveButton} href={reservationUrl}>
      <span>예약 하기</span>
    </a>
  );
}

function MobileInfoBlock({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className={styles.mobileInfoBlock}>
      <h3>{heading}</h3>
      <div>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function MobileMediaStack({ sectionIndex }: { sectionIndex: number }) {
  const mediaFrames = mobileSectionMedia[sectionIndex];

  return (
    <div className={styles.mobileMediaStack}>
      {mediaFrames.map((layers, index) => (
        <div className={styles.mobileMediaFrame} key={`${sectionIndex}-${index}`}>
          {layers.map((layer) => (
            <img className={layer.className} src={layer.src} alt={layer.alt} width={layer.width} height={layer.height} key={layer.src} {...lazyImageAttrs} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MobileCourseMap() {
  return (
    <div className={styles.mobileMapFrame} data-node-id="57:791">
      <img className={styles.mobileMapImage} src={mobileAssets.clubMapRoute} alt="바이크 챌린지 코스 추천 지도" width={354} height={224} {...lazyImageAttrs} />
    </div>
  );
}

function MobileCourseSectionView({ section, index }: { section: TourSection; index: number }) {
  const mobileBadges = section.mobileBadges ?? section.badges;

  return (
    <section className={styles.mobileCourseSection} data-course-anchor={section.anchor} data-node-id={section.nodeId} data-reveal>
      <div className={styles.mobileCourseInfo}>
        <div className={styles.mobileTitleGroup}>
          {section.decoration ? <CourseDecorationImage decoration={section.decoration} mobile /> : null}
          <MobileSectionTitle section={section} />
          <MobileReserveButton section={section} />
        </div>
        <div className={styles.mobileCopyGroup}>
          <div className={styles.mobileSummaryCopy}>
            <BadgeList badges={mobileBadges} className={styles.mobileBadgeList} />
            <h2>{section.mobileSubtitle ?? section.subtitle}</h2>
            <div>
              {section.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className={styles.mobileInfoGroup}>
            <MobileInfoBlock heading="추천 대상" lines={section.audience} />
            <MobileInfoBlock heading="소요시간" lines={section.duration} />
          </div>
        </div>
      </div>
      {section.map ? <MobileCourseMap /> : <MobileMediaStack sectionIndex={index} />}
    </section>
  );
}

function MobileGiftSection() {
  return (
    <section className={styles.mobileGiftSection} data-node-id="57:815" data-reveal>
      <div className={styles.mobileGiftHeading}>
        <h2>
          <CourseDecorationImage decoration="gift" mobile />
          <span>
            따르릉 투어만의
            <br />
            특별한 선물
          </span>
        </h2>
        <p>코스마다 제공되는 선물이 다릅니다. </p>
      </div>
      <div className={styles.mobileGiftGrid}>
        {mobileGifts.map((gift) => (
          <article className={styles.mobileGiftCard} key={gift.title}>
            <div className={styles.mobileGiftIcon}>{gift.icon}</div>
            <h3>{gift.title}</h3>
            <p>{gift.course}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MobileCoursesPage() {
  return (
    <div className={styles.mobilePage} data-node-id="57:904" data-name="02_landing_M">
      <MobileSiteHeader active="courses" compact />
      <div className={styles.mobileContentStack}>
        {sections.map((section, index) => (
          <MobileCourseSectionView section={section} index={index} key={`mobile-${section.nodeId}`} />
        ))}
        <MobileGiftSection />
      </div>
    </div>
  );
}

export function CoursesPage({ className }: CoursesPageProps) {
  return (
    <div className={styles.surface} data-responsive-page="courses">
      <CourseHashScroller />
      <RevealOnScroll />
      <div className={styles.desktopBackground} aria-hidden="true">
        <div className={styles.blurOne} />
        <div className={styles.blurTwo} />
        <div className={styles.blurThree} />
        <div className={styles.blurFour} />
        <div className={styles.blurFive} />
        <div className={styles.blurSix} />
      </div>
      <main className={className ? `${styles.page} ${className}` : styles.page} data-node-id="24:253" data-name="02_Landing">
        <h1 className={styles.visuallyHidden}>여주 자전거 투어 코스 안내</h1>
        <div className={styles.desktopPageContent}>
          <a className={styles.logoLink} href={withBasePath("/")} aria-label="따르릉 여주 홈">
            <img className={styles.logo} src={assets.logo} alt="" width={146} height={101} {...eagerImageAttrs} />
          </a>
          <nav className={styles.nav} aria-label="주요 메뉴">
            <a href={withBasePath("/")}>투어 소개</a>
            <a className={styles.activeNav} href={withBasePath("/courses/")} aria-current="page">
              코스 안내
            </a>
            <a href={withBasePath("/reservation/")}>투어 예약</a>
          </nav>
          <div className={styles.contentStack}>
            {sections.map((section) => (
              <TourSectionView section={section} key={section.nodeId} />
            ))}
            <GiftSection />
          </div>
        </div>
        <MobileCoursesPage />
      </main>
    </div>
  );
}

export default CoursesPage;
