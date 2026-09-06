import CourseCarousel from "@/components/CourseCarousel";
import SitePageShell from "@/components/SitePageShell";
import { courseAnchors, type CourseAnchor } from "@/lib/courseAnchors";
import { withBasePath } from "@/lib/sitePaths";
import { tourCatalog, type TourCatalogItem } from "@/lib/tours";
import styles from "./CoursesPage.module.css";

type CoursesPageProps = { className?: string };

type Decoration = { src: string; width: number; height: number };

const decorations: Record<CourseAnchor, Decoration> = {
  [courseAnchors.hangul]: {
    src: withBasePath("/assets/figma/groups/courses-hangul-letters.png"),
    width: 394,
    height: 154,
  },
  [courseAnchors.goldenBell]: {
    src: withBasePath("/assets/figma/groups/courses-bell.png"),
    width: 195,
    height: 154,
  },
  [courseAnchors.kYeoju]: {
    src: withBasePath("/assets/figma/groups/courses-taegeuk.png"),
    width: 108,
    height: 113,
  },
  [courseAnchors.club]: {
    src: withBasePath("/assets/figma/groups/courses-bike-decoration.png"),
    width: 233,
    height: 152,
  },
};

const giftAssets = {
  decoration: withBasePath("/assets/figma/groups/courses-gift-decoration.png"),
  mask: withBasePath("/assets/figma/260906/gifts/mask.png"),
  keyring: withBasePath("/assets/figma/260906/gifts/keyring.png"),
  camera: withBasePath("/assets/figma/260906/gifts/camera.png"),
  clickerKeyring: withBasePath("/assets/figma/260906/gifts/clicker-keyring.png"),
  pottery: withBasePath("/assets/figma/260906/gifts/pottery.png"),
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
    <SitePageShell page="courses" active="courses" className={[styles.surface, className].filter(Boolean).join(" ")}>
      <main className={styles.main}>
        <h1 className={styles.srOnly}>여주 자전거 시티투어 코스와 예약</h1>
        <div className={styles.courseList}>
          {tourCatalog.map((tour, index) => (
            <BookingCourseSection tour={tour} priority={index === 0} key={tour.anchor} />
          ))}
        </div>
        <GiftSection />
      </main>
    </SitePageShell>
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
      data-visual-id={`course-${tour.anchor}`}
    >
      <div className={styles.courseCopy}>
        <div className={styles.titleWrap}>
          <img
            className={styles.courseDecoration}
            src={decoration.src}
            alt=""
            width={decoration.width}
            height={decoration.height}
            aria-hidden="true"
            data-visual-id={`course-decoration-${tour.anchor}`}
          />
          <h2 id={`${tour.anchor}-title`}>
            {tour.anchor === courseAnchors.kYeoju ? (
              <>
                Yeoju <br />K-Culture Trail
              </>
            ) : tour.title}
          </h2>
        </div>
        <a className={styles.bookingButton} href={tour.booking.href} target="_blank" rel="noreferrer" aria-label={tour.booking.ariaLabel} data-booking-kind={tour.booking.kind}>
          <span className={styles.bookingButtonVisual} data-booking-visual>예약하기</span>
        </a>
      </div>
      <CourseCarousel courseName={tour.title} slides={tour.cardNewsSlides} priority={priority} />
    </section>
  );
}

function GiftSection() {
  return (
    <section className={styles.giftSection} aria-labelledby="gift-title" data-visual-id="gift-section">
      <div className={styles.giftHeading}>
        <div className={styles.giftTitleWrap}>
          <img className={styles.giftDecoration} src={giftAssets.decoration} alt="" width={143} height={156} aria-hidden="true" />
          <h2 id="gift-title">투어를 기념하는 특별한 선물</h2>
        </div>
        <p>코스마다 제공되는 선물이 다릅니다.</p>
      </div>

      <div className={styles.giftGrid}>
        {giftItems.map((gift) => (
          <article className={styles.giftCard} key={gift.title}>
            <div className={styles.giftIcon} aria-hidden="true" data-gift-icon={gift.icon}>
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
  return <img className={styles.iconImage} src={giftAssets[icon]} alt="" width={69} height={69} />;
}
