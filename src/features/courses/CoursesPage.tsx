import ContactFooter from "@/components/ContactFooter";
import CourseCarousel from "@/components/CourseCarousel";
import RevealOnScroll from "@/components/RevealOnScroll";
import SiteHeader from "@/components/SiteHeader";
import { courseAnchors, type CourseAnchor } from "@/lib/courseAnchors";
import { withBasePath } from "@/lib/sitePaths";
import { tourCatalog, type TourCatalogItem } from "@/lib/tours";
import styles from "./CoursesPage.module.css";

type CoursesPageProps = { className?: string };

type Decoration = { desktop: string; mobile: string; width: number; height: number };

const decorations: Record<CourseAnchor, Decoration> = {
  [courseAnchors.hangul]: {
    desktop: withBasePath("/assets/figma/groups/courses-hangul-letters.png"),
    mobile: withBasePath("/assets/figma/mobile/courses-hangul-letters-decoration.png"),
    width: 394,
    height: 154,
  },
  [courseAnchors.goldenBell]: {
    desktop: withBasePath("/assets/figma/groups/courses-bell.png"),
    mobile: withBasePath("/assets/figma/mobile/courses-bell-decoration.png"),
    width: 195,
    height: 154,
  },
  [courseAnchors.kYeoju]: {
    desktop: withBasePath("/assets/figma/groups/courses-taegeuk.png"),
    mobile: withBasePath("/assets/figma/mobile/courses-taegeuk-decoration.png"),
    width: 108,
    height: 113,
  },
  [courseAnchors.club]: {
    desktop: withBasePath("/assets/figma/groups/courses-bike-decoration.png"),
    mobile: withBasePath("/assets/figma/mobile/courses-bike-decoration.png"),
    width: 233,
    height: 152,
  },
};

const giftAssets = {
  decoration: withBasePath("/assets/figma/groups/courses-gift-decoration.png"),
  decorationMobile: withBasePath("/assets/figma/mobile/courses-gift-decoration.png"),
  mask: withBasePath("/assets/figma/mcp/93cbe394-9c05-4d99-8f39-3f425e6a6e0d.svg"),
  ovalBlue: withBasePath("/assets/figma/mcp/261415ef-f7ad-469f-a2bb-df9d47e5b520.svg"),
  keyring: withBasePath("/assets/figma/mcp/42cef7f0-21d9-486d-b54f-03929f4fee80.svg"),
  ovalYellow: withBasePath("/assets/figma/mcp/a44d3d69-27a3-4600-8d86-50bfbf9b607d.svg"),
  camera: withBasePath("/assets/figma/mcp/e404ea38-5482-46ba-8e86-274235ce055d.svg"),
  clickerKeyring: withBasePath("/assets/figma/mcp/35e38e5b-16ab-4234-b890-f589852d9635.svg"),
  pottery: withBasePath("/assets/figma/mcp/4745acfa-e7a7-4c39-a23a-3b415f48cf3b.svg"),
  tshirt: withBasePath("/assets/figma/mcp/gift-tshirt.svg"),
};

type GiftIconKey = "mask" | "keyring" | "camera" | "clickerKeyring" | "pottery" | "tshirt";

const giftItems: readonly { title: string; course: string; icon: GiftIconKey }[] = [
  { title: "자전거 라이딩 마스크", course: "한글길 해설 투어", icon: "mask" },
  { title: "한글 가챠 키링 만들기", course: "한글길 해설 투어", icon: "keyring" },
  { title: "스냅샷 & 드론 영상 촬영", course: "여주 골든벨 투어", icon: "camera" },
  { title: "한글 클릭커 키링 만들기", course: "여주 골든벨 투어", icon: "clickerKeyring" },
  { title: "여주 도자기 기념품", course: "Yeoju K-Culture Trail", icon: "pottery" },
  { title: "완주 인증 티셔츠", course: "여주 프리폰도", icon: "tshirt" },
];

export default function CoursesPage({ className }: CoursesPageProps) {
  return (
    <div className={[styles.surface, className].filter(Boolean).join(" ")} data-responsive-page="courses">
      <RevealOnScroll />
      <SiteHeader active="courses" />
      <main className={styles.main}>
        <h1 className={styles.srOnly}>여주 자전거 시티투어 코스와 예약</h1>
        <div className={styles.courseList}>
          {tourCatalog.map((tour, index) => (
            <BookingCourseSection tour={tour} priority={index === 0} key={tour.anchor} />
          ))}
        </div>
        <GiftSection />
      </main>
      <ContactFooter />
    </div>
  );
}

function BookingCourseSection({ tour, priority }: { tour: TourCatalogItem; priority: boolean }) {
  const decoration = decorations[tour.anchor];

  return (
    <section
      id={tour.anchor}
      className={styles.courseSection}
      aria-labelledby={`${tour.anchor}-title`}
      data-course-anchor={tour.anchor}
      data-reveal
    >
      <div className={styles.courseCopy}>
        <div className={styles.titleWrap}>
          <picture className={styles.courseDecoration} aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={decoration.mobile} />
            <img src={decoration.desktop} alt="" width={decoration.width} height={decoration.height} />
          </picture>
          <h2 id={`${tour.anchor}-title`}>{tour.title}</h2>
        </div>
        <a className={styles.bookingButton} href={tour.booking.href} target="_blank" rel="noreferrer" aria-label={tour.booking.ariaLabel} data-booking-kind={tour.booking.kind}>
          예약하기
        </a>
      </div>
      <CourseCarousel courseName={tour.title} slides={tour.cardNewsSlides} priority={priority} />
    </section>
  );
}

function GiftSection() {
  return (
    <section className={styles.giftSection} aria-labelledby="gift-title" data-reveal>
      <div className={styles.giftHeading}>
        <div className={styles.giftTitleWrap}>
          <picture className={styles.giftDecoration} aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={giftAssets.decorationMobile} />
            <img src={giftAssets.decoration} alt="" width={143} height={156} />
          </picture>
          <h2 id="gift-title">투어를 기념하는 특별한 선물</h2>
        </div>
        <p>코스마다 제공되는 선물이 다릅니다.</p>
      </div>

      <div className={styles.giftGrid}>
        {giftItems.map((gift) => (
          <article className={styles.giftCard} key={gift.title}>
            <div className={styles.giftIcon} aria-hidden="true">
              <GiftIcon icon={gift.icon} />
            </div>
            <h3>{gift.title}</h3>
            <p>{gift.course}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GiftIcon({ icon }: { icon: GiftIconKey }) {
  if (icon === "mask" || icon === "pottery" || icon === "tshirt") {
    return <img className={styles.iconImage} src={giftAssets[icon]} alt="" width={69} height={69} />;
  }

  const isBlue = icon === "keyring";
  const foreground = icon === "keyring" ? giftAssets.keyring : icon === "camera" ? giftAssets.camera : giftAssets.clickerKeyring;

  return (
    <span className={styles.iconStack}>
      <img className={styles.iconOval} src={isBlue ? giftAssets.ovalBlue : giftAssets.ovalYellow} alt="" width={69} height={69} />
      <img className={styles.iconForeground} src={foreground} alt="" width={34} height={44} />
    </span>
  );
}
