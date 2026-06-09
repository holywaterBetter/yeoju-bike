import MobileSiteHeader from "@/components/MobileSiteHeader";
import RevealOnScroll from "@/components/RevealOnScroll";
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

type TourSection = {
  anchor: CourseAnchor;
  nodeId: string;
  title: string | string[];
  titleWidth: number;
  subtitle: string;
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
  hangulHeroFrame: withBasePath("/assets/figma/groups/courses-hangul-hero-frame.png"),
  geumeunCampingFrame: withBasePath("/assets/figma/groups/courses-geumeun-camping-frame.png"),
  marketGateFrame: withBasePath("/assets/figma/groups/courses-market-gate-frame.png"),
  goldenBellHeroFrame: withBasePath("/assets/figma/groups/courses-golden-hero-frame.png"),
  goldenBellGalleryLeftFrame: withBasePath("/assets/figma/groups/courses-golden-gallery-left-frame.png"),
  goldenBellGalleryRightFrame: withBasePath("/assets/figma/groups/courses-golden-gallery-right-frame.png"),
  kYeojuHeroFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-hero-frame.png"),
  kYeojuGalleryLeftFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-gallery-left-frame.png"),
  kYeojuGalleryRightFrame: withBasePath("/assets/figma/groups/courses-k-yeoju-gallery-right-frame.png"),
  clubMapFrame: withBasePath("/assets/figma/groups/courses-club-map-frame.png"),
  giftMask: withBasePath("/assets/figma/mcp/93cbe394-9c05-4d99-8f39-3f425e6a6e0d.svg"),
  giftOvalBlue: withBasePath("/assets/figma/mcp/261415ef-f7ad-469f-a2bb-df9d47e5b520.svg"),
  giftKeyring: withBasePath("/assets/figma/mcp/fe34cedf-8ce0-479e-963b-52c04a0c10bc.svg"),
  giftOvalYellow: withBasePath("/assets/figma/mcp/a44d3d69-27a3-4600-8d86-50bfbf9b607d.svg"),
  giftCamera: withBasePath("/assets/figma/mcp/e404ea38-5482-46ba-8e86-274235ce055d.svg"),
  giftPen: withBasePath("/assets/figma/mcp/c224118b-862d-40a4-a45a-f71a4dcc63d1.svg"),
  giftPottery: withBasePath("/assets/figma/mcp/a8826322-e68e-48d8-af03-4e09ce44411c.svg"),
  giftBottle: withBasePath("/assets/figma/mcp/ef35a27c-7d1f-41ff-8292-26f9974ca576.svg"),
};

const mobileAssets = {
  hangulHero: withBasePath("/assets/figma/mobile/courses-hangul-hero.png"),
  hangulLettersDecoration: withBasePath("/assets/figma/mobile/courses-hangul-letters-decoration.png"),
  bellDecoration: withBasePath("/assets/figma/mobile/courses-bell-decoration.png"),
  taegeukDecoration: withBasePath("/assets/figma/mobile/courses-taegeuk-decoration.png"),
  bikeDecoration: withBasePath("/assets/figma/mobile/courses-bike-decoration.png"),
  giftDecoration: withBasePath("/assets/figma/mobile/courses-gift-decoration.png"),
  market: withBasePath("/assets/figma/mobile/courses-market.png"),
  goldenLeft: withBasePath("/assets/figma/mobile/courses-golden-left.png"),
  goldenRightA: withBasePath("/assets/figma/mobile/courses-golden-right-a.png"),
  goldenRightB: withBasePath("/assets/figma/mobile/courses-golden-right-b.png"),
  kHero: withBasePath("/assets/figma/mobile/courses-k-hero.png"),
  kBoat: withBasePath("/assets/figma/mobile/courses-k-boat.png"),
  kRice: withBasePath("/assets/figma/mobile/courses-k-rice.png"),
  clubMapRoute: withBasePath("/assets/figma/mobile/courses-club-map-route.png"),
};

const sections: TourSection[] = [
  {
    anchor: courseAnchors.hangul,
    nodeId: "23:896",
    title: ["따르릉 여주 한글길 투어", "ㄱ부터 ㅎ까지"],
    titleWidth: 632,
    subtitle: "여주의 숨은 이야기를 따라 달리는 자전거 여행",
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
        alt: "여주 한글길 투어 카드 거치대",
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
    title: "남한강 골든벨 투어",
    titleWidth: 632,
    subtitle: "남한강변에서 펼쳐지는 우리 가족 미션 어드벤처",
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
        alt: "남한강 골든벨 투어 라이딩 배경",
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
    title: "K-여주 바이크 투어",
    titleWidth: 632,
    subtitle: "외국인 친구에게 소개하고 싶은 ‘가장 한국적인 하루’",
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
    title: "따르릉 동호회 코스 (자율 라이딩)",
    titleWidth: 822,
    subtitle: "우리만의 속도로 자유롭게 남한강을 누비는 라이더의 시간",
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

const gifts = [
  {
    title: "자전거 라이딩 마스크",
    course: "따르릉 여주 한글길 투어",
    icon: <img className={styles.iconImage} src={assets.giftMask} alt="" />,
  },
  {
    title: "가챠 키링 만들기 세트",
    course: "따르릉 여주 한글길 투어",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalBlue} alt="" />
        <img className={styles.keyringIcon} src={assets.giftKeyring} alt="" />
      </span>
    ),
  },
  {
    title: "스냅샷 & 드론 영상 촬영",
    course: "남한강 골등벨 투어",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" />
        <img className={styles.cameraIcon} src={assets.giftCamera} alt="" />
      </span>
    ),
  },
  {
    title: "나만의 여주 펜 꾸미기",
    course: "남한강 골등벨 투어",
    icon: (
      <span className={styles.iconStack}>
        <img className={styles.iconOval} src={assets.giftOvalYellow} alt="" />
        <img className={styles.penIcon} src={assets.giftPen} alt="" />
      </span>
    ),
  },
  {
    title: "여주 도자기 기념품",
    course: "K- 여주 바이크 투어 (외국인 맞춤형)",
    icon: <img className={styles.iconImage} src={assets.giftPottery} alt="" />,
  },
  {
    title: "여주 자전거 물통",
    course: "동호회 투어",
    icon: <img className={styles.iconImage} src={assets.giftBottle} alt="" />,
  },
];

const mobileSectionMedia = [
  [
    [{ src: mobileAssets.hangulHero, alt: "여주 한글길 카드 거치대", className: styles.mobileHangulHeroImage }],
    [{ src: assets.geumeunCampingFrame, alt: "금은모래캠핑장", className: styles.mobileGeumeunFrameImage }],
    [{ src: mobileAssets.market, alt: "한글시장 입구", className: styles.mobileMarketImage }],
  ],
  [
    [{ src: assets.goldenBellHeroFrame, alt: "남한강 골든벨 투어 라이딩", className: styles.mobileGoldenHeroFrameImage }],
    [{ src: mobileAssets.goldenLeft, alt: "남한강 공원", className: styles.mobileGoldenLeftImage }],
    [
      { src: mobileAssets.goldenRightA, alt: "", className: styles.mobileGoldenRightImageA },
      { src: mobileAssets.goldenRightB, alt: "남한강 산책길", className: styles.mobileGoldenRightImageB },
    ],
  ],
  [
    [{ src: mobileAssets.kHero, alt: "여주 도자기 체험", className: styles.mobileKHeroImage }],
    [{ src: mobileAssets.kBoat, alt: "황포돛배", className: styles.mobileKBoatImage }],
    [{ src: mobileAssets.kRice, alt: "유색벼 논 그림", className: styles.mobileKRiceImage }],
  ],
] satisfies {
  src: string;
  alt: string;
  className: string;
}[][][];

function PositionedMediaImage({ media }: { media: PositionedMedia }) {
  return (
    <img
      className={styles.positionedMediaImage}
      src={media.src}
      alt={media.alt}
      style={{
        left: media.left,
        top: media.top,
        width: media.width,
        height: media.height,
      }}
    />
  );
}

function SectionTitle({ title, width }: { title: string | string[]; width: number }) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <h1 className={styles.sectionTitle} style={{ width }}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </h1>
  );
}

function ReservationButton({ section }: { section: TourSection }) {
  const reservationUrl = getTourReservationUrl(section.anchor);

  if (!reservationUrl) {
    return (
      <span className={`${styles.reserveButton} ${styles.reserveButtonDisabled}`} aria-disabled="true">
        준비 중입니다
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
    <section className={styles.tourSection} data-course-anchor={section.anchor} data-node-id={section.nodeId} data-reveal>
      <div className={styles.sectionIntro}>
        <div className={styles.titleGroup}>
          <SectionTitle title={section.title} width={section.titleWidth} />
          <ReservationButton section={section} />
        </div>
        <div className={styles.copyGroup}>
          <div className={styles.summaryCopy}>
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
      <img className={styles.mapFrameImage} src={assets.clubMapFrame} alt="동호회 자율 라이딩 추천 코스 지도" />
    </div>
  );
}

function GiftSection() {
  return (
    <section className={styles.giftSection} data-node-id="30:215" data-reveal>
      <div className={styles.giftHeading}>
        <h2>따르릉 투어만의 특별한 선물</h2>
        <p>투어마다 제공되는 선물이 다릅니다. </p>
      </div>
      <div className={styles.giftGrid}>
        {gifts.map((gift) => (
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

function DecorativeAssets() {
  return (
    <div className={styles.decorativeAssets} aria-hidden="true">
      <img className={styles.hangulLettersDecoration} src={assets.hangulLetters} alt="" data-node-id="24:123" />
      <img className={styles.bellDecoration} src={assets.bell} alt="" data-node-id="28:148" data-name="종" />
      <img className={styles.taegeukDecoration} src={assets.taegeuk} alt="" data-node-id="28:206" data-name="태극기" />
      <img className={styles.bikeDecoration} src={assets.bikeDecoration} alt="" data-node-id="28:169" data-name="자전거" />
      <img className={styles.giftDecoration} src={assets.giftDecoration} alt="" data-node-id="31:453" data-name="선물" />
    </div>
  );
}

function MobileSectionTitle({ section }: { section: TourSection }) {
  const lines =
    section.anchor === courseAnchors.hangul
      ? ["따르릉 여주 한글길 투어", "ㄱ부터 ㅎ까지"]
      : section.anchor === courseAnchors.club
        ? ["따르릉 동호회 코스", "(자율 라이딩)"]
        : Array.isArray(section.title)
          ? section.title
          : [section.title];

  return (
    <h1 className={styles.mobileCourseTitle}>
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </h1>
  );
}

function MobileReserveButton({ section }: { section: TourSection }) {
  const reservationUrl = getTourReservationUrl(section.anchor);

  if (!reservationUrl) {
    return (
      <span className={`${styles.mobileReserveButton} ${styles.mobileReserveButtonDisabled}`} aria-disabled="true">
        <span>준비 중입니다</span>
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
            <img className={layer.className} src={layer.src} alt={layer.alt} key={layer.src} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MobileCourseMap() {
  return (
    <div className={styles.mobileMapFrame} data-node-id="57:791">
      <img className={styles.mobileMapImage} src={mobileAssets.clubMapRoute} alt="동호회 자율 라이딩 추천 코스 지도" />
    </div>
  );
}

function MobileCourseSectionView({ section, index }: { section: TourSection; index: number }) {
  return (
    <section className={styles.mobileCourseSection} data-course-anchor={section.anchor} data-node-id={section.nodeId} data-reveal>
      <div className={styles.mobileCourseInfo}>
        <div className={styles.mobileTitleGroup}>
          <MobileSectionTitle section={section} />
          <MobileReserveButton section={section} />
        </div>
        <div className={styles.mobileCopyGroup}>
          <div className={styles.mobileSummaryCopy}>
            <h2>{section.subtitle}</h2>
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
          따르릉 투어만의
          <br />
          특별한 선물
        </h2>
        <p>투어마다 제공되는 선물이 다릅니다. </p>
      </div>
      <div className={styles.mobileGiftGrid}>
        {gifts.map((gift) => (
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

function MobileDecorativeAssets() {
  return (
    <div className={styles.mobileDecorativeAssets} aria-hidden="true">
      <img className={styles.mobileHangulLettersDecoration} src={mobileAssets.hangulLettersDecoration} alt="" />
      <img className={styles.mobileBellDecoration} src={mobileAssets.bellDecoration} alt="" />
      <img className={styles.mobileTaegeukDecoration} src={mobileAssets.taegeukDecoration} alt="" />
      <img className={styles.mobileBikeDecoration} src={mobileAssets.bikeDecoration} alt="" />
      <img className={styles.mobileGiftDecoration} src={mobileAssets.giftDecoration} alt="" />
    </div>
  );
}

function MobileCoursesPage() {
  return (
    <div className={styles.mobilePage} data-node-id="57:904" data-name="02_landing_M">
      <MobileSiteHeader active="courses" compact />
      <MobileDecorativeAssets />
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
        <div className={styles.desktopPageContent}>
          <DecorativeAssets />
          <a className={styles.logoLink} href={withBasePath("/")} aria-label="따르릉 여주 홈">
            <img className={styles.logo} src={assets.logo} alt="" />
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
