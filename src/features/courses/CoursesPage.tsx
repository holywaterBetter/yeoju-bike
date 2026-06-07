import type { CSSProperties } from "react";
import styles from "./CoursesPage.module.css";

type CoursesPageProps = {
  className?: string;
};

type Crop = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type TourSection = {
  nodeId: string;
  title: string | string[];
  titleWidth: number;
  subtitle: string;
  body: string[];
  audience: string[];
  duration: string[];
  heroHeight: number;
  heroImages?: Crop[];
  gallery?: {
    left: Crop[];
    right: Crop[];
  };
  map?: boolean;
};

type BleedAsset = {
  src: string;
  style: CSSProperties;
  bleed: CSSProperties;
  nodeId?: string;
};

const assets = {
  reference: "/assets/figma/reference/02-courses.png",
  logo: "/assets/figma/mcp/8fa42453-1f1e-4981-b9ac-b829a4af9936.png",
  hangulCardRack: "/assets/figma/mcp/00b7bd70-c408-4d3a-a406-af105b4ac999.jpg",
  geumeunCamping: "/assets/figma/crops/courses-gallery-geumeun.png",
  marketGate: "/assets/figma/mcp/a59ed984-b4a2-49bb-b115-545a58f5587d.jpg",
  goldenBellHero: "/assets/figma/crops/courses-golden-hero.png",
  goldenBellPark: "/assets/figma/mcp/6fce6fb9-9633-4f3c-a61e-333e7379652f.jpg",
  goldenBellPathA: "/assets/figma/mcp/d600f0af-7cb1-49fd-af7b-50a1dd19bbb9.jpg",
  goldenBellPathB: "/assets/figma/mcp/86c6b08c-50e8-43e7-aff9-ca1f8c222be3.jpg",
  potteryHero: "/assets/figma/mcp/f0665e81-942a-4315-b59c-aa7d93089c94.png",
  riverBoat: "/assets/figma/mcp/20b6ccb5-2d34-4fc6-a162-f22c4f40e927.jpg",
  riceField: "/assets/figma/mcp/b57a7126-550f-4fdd-9a42-cffeaf81ca71.jpg",
  mapBase: "/assets/figma/mcp/a2321fec-bb87-4fe9-8a3e-d29a0b39c6ed.png",
  route76: "/assets/figma/mcp/f0b2d57e-232c-41c8-b25b-137943bdf1d9.svg",
  route77: "/assets/figma/mcp/370b1f90-e915-472d-8b21-704fa205aa84.svg",
  route78: "/assets/figma/mcp/df34b272-6d01-4bc4-9421-32c9c220c45c.svg",
  route79: "/assets/figma/mcp/28b73b83-8b51-4990-9310-8995561411cd.svg",
  route80: "/assets/figma/mcp/b5206afc-87d7-453d-b9b7-8fe8b4abb5ac.svg",
  route81: "/assets/figma/mcp/a3608a9e-a4ec-46df-a80a-c2c661a5460b.svg",
  route82: "/assets/figma/mcp/2ae22c5f-7764-441e-b78f-ffae9756fd69.svg",
  route83: "/assets/figma/mcp/19eec02a-1dd0-4f3c-9bc9-06a2acb61d7a.svg",
  route84: "/assets/figma/mcp/6459d6fb-a668-4089-afb2-27298df5ab68.svg",
  route85: "/assets/figma/mcp/f752d370-025b-4712-b434-f7875ab36b85.svg",
  route86: "/assets/figma/mcp/05cf6b3e-83bc-4dc2-b9c9-df1cfe1e1bb2.svg",
  route87: "/assets/figma/mcp/4fa9954b-e853-40a0-b327-3c022205ed10.svg",
  route88: "/assets/figma/mcp/e6db3c06-3210-4404-99e1-9237b358736a.svg",
  route89: "/assets/figma/mcp/3ac24298-cafb-4bb0-8a90-458b572a55ec.svg",
  mapPin: "/assets/figma/mcp/1e00ddda-db3c-41a5-b946-4d2bf9c82ced.svg",
  mapPinCircle: "/assets/figma/mcp/fb567974-586c-4cfb-a091-0711dce760cc.svg",
  giftMask: "/assets/figma/mcp/93cbe394-9c05-4d99-8f39-3f425e6a6e0d.svg",
  giftOvalBlue: "/assets/figma/mcp/261415ef-f7ad-469f-a2bb-df9d47e5b520.svg",
  giftKeyring: "/assets/figma/mcp/fe34cedf-8ce0-479e-963b-52c04a0c10bc.svg",
  giftOvalYellow: "/assets/figma/mcp/a44d3d69-27a3-4600-8d86-50bfbf9b607d.svg",
  giftCamera: "/assets/figma/mcp/e404ea38-5482-46ba-8e86-274235ce055d.svg",
  giftPen: "/assets/figma/mcp/c224118b-862d-40a4-a45a-f71a4dcc63d1.svg",
  giftPottery: "/assets/figma/mcp/a8826322-e68e-48d8-af03-4e09ce44411c.svg",
  giftBottle: "/assets/figma/mcp/ef35a27c-7d1f-41ff-8292-26f9974ca576.svg",
};

const sections: TourSection[] = [
  {
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
        src: assets.hangulCardRack,
        alt: "여주 한글길 투어 카드 거치대",
        left: 0,
        top: -531,
        width: 1200,
        height: 1600,
      },
    ],
    gallery: {
      left: [
        {
          src: assets.geumeunCamping,
          alt: "금은모래캠핑장",
          left: 0,
          top: 0,
          width: 600,
          height: 324,
        },
      ],
      right: [
        {
          src: assets.marketGate,
          alt: "한글시장 입구",
          left: 0,
          top: -18,
          width: 600,
          height: 400,
        },
      ],
    },
  },
  {
    nodeId: "24:156",
    title: "남한강 골든벨 투어",
    titleWidth: 632,
    subtitle: "남한강변에서 펼쳐지는 우리 가족 미션 어드벤처",
    body: [
      "시원한 남한강변을 달리며 중간중간 주어지는 여주 관련 퀴즈를 풀어보는 참여형 액티비티 코스입니다.",
      "가족이 함께 힘을 합쳐 문제를 풀고, 드론 촬영으로 평생 남을 특별한 추억도 남겨보세요.",
    ],
    audience: ["아이와 함께 특별한 체험을 원하는 가족 단위 여행객"],
    duration: ["약 30분"],
    heroHeight: 619,
    heroImages: [
      {
        src: assets.goldenBellHero,
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
          src: assets.goldenBellPark,
          alt: "남한강 공원",
          left: -131,
          top: -110,
          width: 818,
          height: 462,
        },
      ],
      right: [
        {
          src: assets.goldenBellPathA,
          alt: "남한강 산책길",
          left: -252,
          top: -142,
          width: 869,
          height: 652,
        },
        {
          src: assets.goldenBellPathB,
          alt: "남한강길 라이딩",
          left: -305,
          top: -277,
          width: 1170,
          height: 878,
        },
      ],
    },
  },
  {
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
        src: assets.potteryHero,
        alt: "여주 도자기 체험",
        left: -346,
        top: -27,
        width: 2550,
        height: 674,
      },
    ],
    gallery: {
      left: [
        {
          src: assets.riverBoat,
          alt: "황포돛배",
          left: -158,
          top: -120,
          width: 1003,
          height: 564,
        },
      ],
      right: [
        {
          src: assets.riceField,
          alt: "유색벼 논 그림",
          left: -104,
          top: -112,
          width: 703,
          height: 468,
        },
      ],
    },
  },
  {
    nodeId: "24:423",
    title: "따르릉 동호회 코스 (자율 라이딩)",
    titleWidth: 822,
    subtitle: "우리만의 속도로 자유롭게 남한강을 누비는 라이더의 시간",
    body: [
      "가이드 동행 없이 동호회원들끼리 자유롭게 여주의 아름다운 자전거길을 달리는 자율 주행 코스입니다.",
      "따르릉이 추천하는 코스를 따라 남한강의 시원한 바람과 탁 트인 풍경을 오롯이 느끼며 그룹 라이딩의 쾌감을 만끽해보세요.",
    ],
    audience: ["자전거 동호회", "우리끼리 자유로운 라이딩을 원하는 단체"],
    duration: ["자유", "(추천 코스맵 제공)"],
    heroHeight: 734,
    map: true,
  },
];

const mapSegments: BleedAsset[] = [
  {
    src: assets.route76,
    nodeId: "32:537",
    style: { left: 908.37, top: 399.88, width: 56.173, height: 146.44 },
    bleed: { top: "-3.73%", right: "-10.46%", bottom: "-3.7%", left: "-8.51%" },
  },
  {
    src: assets.route77,
    nodeId: "32:538",
    style: { left: 935.4, top: 235.39, width: 59.94, height: 164.573 },
    bleed: { top: "-2.19%", right: "-9.19%", bottom: "-3.25%", left: "-8.14%" },
  },
  {
    src: assets.route78,
    nodeId: "32:539",
    style: { left: 771.29, top: 187.07, width: 163.029, height: 157.541 },
    bleed: { top: "-3.49%", right: "-3.55%", bottom: "-3.45%", left: "-3.82%" },
  },
  {
    src: assets.route79,
    nodeId: "32:540",
    style: { left: 778.37, top: 61.67, width: 23.931, height: 123.174 },
    bleed: { top: "-4.83%", right: "-24.68%", bottom: "-5.05%", left: "-26.8%" },
  },
  {
    src: assets.route80,
    nodeId: "32:541",
    style: { left: 543.3, top: 53.4, width: 235.056, height: 82.003 },
    bleed: { top: "-7.42%", right: "-2.26%", bottom: "-7.83%", left: "-2.29%" },
  },
  {
    src: assets.route81,
    nodeId: "32:542",
    style: { left: 362.56, top: 123.17, width: 182.023, height: 49.62 },
    bleed: { top: "-10.96%", right: "-2.87%", bottom: "-12.28%", left: "-1.98%" },
  },
  {
    src: assets.route82,
    nodeId: "32:543",
    style: { left: 258.48, top: 36.25, width: 106.56, height: 173.907 },
    bleed: { top: "-3.3%", right: "-5.14%", bottom: "-3.66%", left: "-4.74%" },
  },
  {
    src: assets.route83,
    nodeId: "32:544",
    style: { left: 322.44, top: 210.33, width: 47.559, height: 102.302 },
    bleed: { top: "-6.36%", right: "-11.76%", bottom: "-4.94%", left: "-12.47%" },
  },
  {
    src: assets.route84,
    nodeId: "32:545",
    style: { left: 371.54, top: 313.66, width: 44.692, height: 94.433 },
    bleed: { top: "-5.71%", right: "-13.42%", bottom: "-5.54%", left: "-12.82%" },
  },
  {
    src: assets.route85,
    nodeId: "32:546",
    style: { left: 343.23, top: 404.59, width: 65.693, height: 148 },
    bleed: { top: "-3.62%", right: "-9.43%", bottom: "-3.68%", left: "-8.32%" },
  },
  {
    src: assets.route86,
    nodeId: "32:547",
    style: { left: 345.45, top: 534.54, width: 213.501, height: 35.082 },
    bleed: { top: "-15.21%", right: "-2.67%", bottom: "-17.88%", left: "-2.51%" },
  },
  {
    src: assets.route87,
    nodeId: "32:548",
    style: { left: 560.83, top: 481.32, width: 177.575, height: 135.899 },
    bleed: { top: "-4.35%", right: "-3.54%", bottom: "-4.57%", left: "-2.98%" },
  },
  {
    src: assets.route88,
    nodeId: "32:549",
    style: { left: 733.99, top: 504.84, width: 42.231, height: 146.097 },
    bleed: { top: "-3.92%", right: "-12.1%", bottom: "-3.81%", left: "-14.78%" },
  },
  {
    src: assets.route89,
    nodeId: "32:550",
    style: { left: 775.79, top: 547.01, width: 138.228, height: 145.635 },
    bleed: { top: "-4.22%", right: "-3.22%", bottom: "-3.79%", left: "-4.56%" },
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

function CropImage({ crop }: { crop: Crop }) {
  return (
    <img
      className={styles.cropImage}
      src={crop.src}
      alt={crop.alt}
      style={{
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
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

function ReservationButton() {
  return (
    <a className={styles.reserveButton} href="/reservation">
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
    <section className={styles.tourSection} data-node-id={section.nodeId}>
      <div className={styles.sectionIntro}>
        <div className={styles.titleGroup}>
          <SectionTitle title={section.title} width={section.titleWidth} />
          <ReservationButton />
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
          section.heroImages?.map((crop) => <CropImage key={`${crop.src}-${crop.top}`} crop={crop} />)
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
          <CropImage key={`${crop.src}-${crop.top}`} crop={crop} />
        ))}
      </div>
      <div className={styles.gallerySmall}>
        {gallery.right.map((crop) => (
          <CropImage key={`${crop.src}-${crop.top}`} crop={crop} />
        ))}
      </div>
    </div>
  );
}

function BleedImage({ asset }: { asset: BleedAsset }) {
  return (
    <div className={styles.bleedAsset} data-node-id={asset.nodeId} style={asset.style}>
      <div className={styles.bleedBox} style={asset.bleed}>
        <img src={asset.src} alt="" />
      </div>
    </div>
  );
}

function CourseMap() {
  return (
    <div className={styles.mapRoot} data-node-id="32:535">
      <div className={styles.mapBase} data-node-id="32:536">
        <img src={assets.mapBase} alt="동호회 자율 라이딩 추천 코스 지도" />
      </div>
      <div className={styles.mapRoutes} data-node-id="34:80">
        {mapSegments.map((asset) => (
          <BleedImage asset={asset} key={asset.nodeId} />
        ))}
      </div>
      <div className={styles.startPin} data-node-id="32:551">
        <img className={styles.pinShape} src={assets.mapPin} alt="" />
        <img className={styles.pinCircle} src={assets.mapPinCircle} alt="" />
        <span>출발</span>
      </div>
    </div>
  );
}

function GiftSection() {
  return (
    <section className={styles.giftSection} data-node-id="30:215">
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

export function CoursesPage({ className }: CoursesPageProps) {
  return (
    <main className={className ? `${styles.page} ${className}` : styles.page} data-node-id="24:253" data-name="02_Landing">
      <img className={styles.referenceLayer} src={assets.reference} alt="" aria-hidden="true" />
      <div className={styles.blurOne} />
      <div className={styles.blurTwo} />
      <div className={styles.blurThree} />
      <div className={styles.blurFour} />
      <div className={styles.blurFive} />
      <a className={styles.logoLink} href="/" aria-label="따르릉 여주 홈">
        <img className={styles.logo} src={assets.logo} alt="" />
      </a>
      <nav className={styles.nav} aria-label="주요 메뉴">
        <a href="/">투어 소개</a>
        <a className={styles.activeNav} href="/courses" aria-current="page">
          코스 안내
        </a>
        <a href="/reservation">투어 예약</a>
      </nav>
      <div className={styles.contentStack}>
        {sections.map((section) => (
          <TourSectionView section={section} key={section.nodeId} />
        ))}
        <GiftSection />
      </div>
    </main>
  );
}

export default CoursesPage;
