import type { ReactNode } from "react";
import { type CourseAnchor, courseAnchors } from "@/lib/courseAnchors";
import { withBasePath } from "@/lib/sitePaths";
import { getTourReservationUrl } from "@/lib/tourLinks";
import styles from "./ReservationPage.module.css";

const logoImage =
  withBasePath("/assets/figma/mcp/6b90eb4f-12f6-4bac-94f6-a67f6ca5bab7.png");
const hangulTourMedia =
  withBasePath("/assets/figma/groups/tour-card-hangul-media.png");
const goldenBellMedia =
  withBasePath("/assets/figma/groups/tour-card-golden-media.png");
const kYeojuMedia =
  withBasePath("/assets/figma/groups/tour-card-k-yeoju-media.png");
const clubCourseMedia =
  withBasePath("/assets/figma/groups/tour-card-club-media.png");
const pinIcon =
  withBasePath("/assets/figma/mcp/9d7342cc-64ce-481a-b535-338c1a4fc314.svg");
const carIcon =
  withBasePath("/assets/figma/mcp/cc6bdacf-aa31-4702-ab02-87c596891edd.svg");
const trainIcon =
  withBasePath("/assets/figma/mcp/22b70c87-c9fd-41fa-893e-8608e95ee02c.svg");

const mobileAssets = {
  hangulCard: withBasePath("/assets/figma/mobile/reservation-card-hangul.png"),
  goldenCard: withBasePath("/assets/figma/mcp/8d01a7f6-43e6-4989-be27-7bff9861bf36.jpg"),
  kYeojuCard: withBasePath("/assets/figma/mobile/reservation-card-k.png"),
  clubCard: withBasePath("/assets/figma/mobile/reservation-card-club.png"),
  pin: withBasePath("/assets/figma/mobile/reservation-pin.svg"),
  car: withBasePath("/assets/figma/mobile/reservation-car.svg"),
  train: withBasePath("/assets/figma/mobile/reservation-train.svg"),
};

type ReservationPageProps = {
  className?: string;
};

type TourCardData = {
  anchor: CourseAnchor;
  title: string;
  image: string;
};

type MobileTourCardData = {
  anchor: CourseAnchor;
  title: ReactNode;
  plainTitle: string;
  image: string;
  imageClassName: string;
  gradientClassName: string;
};

const tourCards: TourCardData[] = [
  {
    anchor: courseAnchors.hangul,
    title: "따르릉 여주 한글길 투어",
    image: hangulTourMedia,
  },
  {
    anchor: courseAnchors.goldenBell,
    title: "남한강 골든벨 투어",
    image: goldenBellMedia,
  },
  {
    anchor: courseAnchors.kYeoju,
    title: "K-여주 바이크 투어",
    image: kYeojuMedia,
  },
  {
    anchor: courseAnchors.club,
    title: "따르릉 동호회 코스",
    image: clubCourseMedia,
  },
];

const mobileTourCards: MobileTourCardData[] = [
  {
    anchor: courseAnchors.hangul,
    plainTitle: "따르릉 여주 한글길 투어",
    title: (
      <>
        따르릉
        <br />
        여주 한글길 투어
      </>
    ),
    image: mobileAssets.hangulCard,
    imageClassName: "mobileCardHangulImage",
    gradientClassName: "mobileCardGradientBlack",
  },
  {
    anchor: courseAnchors.goldenBell,
    plainTitle: "남한강 골든벨 투어",
    title: (
      <>
        남한강
        <br />
        골든벨 투어
      </>
    ),
    image: mobileAssets.goldenCard,
    imageClassName: "mobileCardGoldenImage",
    gradientClassName: "mobileCardGradientOlive",
  },
  {
    anchor: courseAnchors.kYeoju,
    plainTitle: "K-여주 바이크 투어",
    title: (
      <>
        K-여주
        <br />
        바이크 투어
      </>
    ),
    image: mobileAssets.kYeojuCard,
    imageClassName: "mobileCardKYeojuImage",
    gradientClassName: "mobileCardGradientGreen",
  },
  {
    anchor: courseAnchors.club,
    plainTitle: "따르릉 동호회 코스",
    title: (
      <>
        따르릉
        <br />
        동호회 코스
      </>
    ),
    image: mobileAssets.clubCard,
    imageClassName: "mobileCardClubImage",
    gradientClassName: "mobileCardGradientBrown",
  },
];

function MobileHeader() {
  return (
    <header className={styles.mobileHeader} data-node-id="57:1549" data-name="header">
      <a className={styles.mobileLogo} href={withBasePath("/")} aria-label="따르릉 여주 홈">
        <img src={logoImage} alt="따르릉 여주 로고" />
      </a>
      <button className={styles.mobileMenuButton} type="button" aria-label="메뉴 열기">
        <span className={styles.mobileMenuBars} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}

function MobileTourCard({
  card,
}: {
  card: MobileTourCardData;
}) {
  const reservationUrl = getTourReservationUrl(card.anchor);
  const content = (
    <>
      <div className={styles.mobileCardMedia}>
        <img className={styles[card.imageClassName as keyof typeof styles]} src={card.image} alt="" />
        <div className={styles.mobileCardBlur} />
        <div className={`${styles.mobileCardGradient} ${styles[card.gradientClassName as keyof typeof styles]}`} />
      </div>
      <h2>
        <span>{card.title}</span>
        {!reservationUrl && <span className={styles.mobileCardStatus}>준비 중입니다</span>}
      </h2>
    </>
  );

  if (!reservationUrl) {
    return (
      <article className={`${styles.mobileTourCard} ${styles.mobileTourCardDisabled}`} aria-disabled="true">
        {content}
      </article>
    );
  }

  return (
    <a className={styles.mobileTourCard} href={reservationUrl} aria-label={`${card.plainTitle} 예약하기`}>
      {content}
    </a>
  );
}

function ReservationTourCard({ card }: { card: TourCardData }) {
  const reservationUrl = getTourReservationUrl(card.anchor);
  const content = (
    <>
      <div className={styles.cardMedia}>
        <img
          className={`${styles.cardImage} ${styles.cardMediaImage}`}
          src={card.image}
          alt=""
        />
      </div>
      <div className={styles.cardLabel}>
        <h2>{card.title}</h2>
        {!reservationUrl && <p className={styles.cardStatus}>준비 중입니다</p>}
      </div>
    </>
  );

  if (!reservationUrl) {
    return (
      <article className={`${styles.tourCard} ${styles.tourCardDisabled}`} aria-disabled="true">
        {content}
      </article>
    );
  }

  return (
    <a className={styles.tourCard} href={reservationUrl} aria-label={`${card.title} 예약하기`}>
      {content}
    </a>
  );
}

function MobileReservationPage() {
  return (
    <div className={styles.mobilePage} data-node-id="57:1951" data-name="03_landing_M">
      <MobileHeader />
      <div className={styles.mobileContentStack}>
        <section className={styles.mobileReservationIntro} aria-labelledby="mobile-reservation-title">
          <div className={styles.mobileCopyBlock}>
            <h1 id="mobile-reservation-title">투어 예약</h1>
            <div>
              <p>원하시는 투어 코스를 선택해 예약 폼을 작성해 주세요.</p>
              <p>담당자가 확인 후, 예약 확정 및 안내 문자를 빠르게 발송해드립니다. </p>
            </div>
          </div>
          <div className={styles.mobileCardGrid} aria-label="투어 코스 선택">
            {mobileTourCards.map((card) => (
              <MobileTourCard card={card} key={card.plainTitle} />
            ))}
          </div>
        </section>

        <section className={styles.mobileDirections} aria-labelledby="mobile-directions-title">
          <div className={styles.mobileDirectionsHeader}>
            <h2 id="mobile-directions-title">따르릉으로 오시는 길</h2>
            <div className={styles.mobileAddressRow}>
              <img src={mobileAssets.pin} alt="" />
              <p>경기도 여주시 강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방</p>
            </div>
          </div>
          <div className={styles.mobileTransportGroup}>
            <div className={styles.mobileTransportBlock}>
              <img className={styles.mobileCarIcon} src={mobileAssets.car} alt="" />
              <div className={styles.mobileTransportCopy}>
                <h3>자가 이용 시</h3>
                <div className={styles.mobileTransportDetails}>
                  <div>
                    <p className={styles.mobileDetailHeading}>유료</p>
                    <p>금은모래캠핑장 2주차장</p>
                    <p>(경기도 여주시 강변유원지길 107)</p>
                  </div>
                  <div>
                    <p className={styles.mobileDetailHeading}>무료</p>
                    <p>공원 주차장</p>
                    <p>(경기도 여주시 강변유원지길 164)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mobileTransportBlock}>
              <img className={styles.mobileTrainIcon} src={mobileAssets.train} alt="" />
              <div className={styles.mobileTransportCopy}>
                <h3>대중교통 이용 시</h3>
                <div className={styles.mobileTransportDetails}>
                  <div>
                    <p className={styles.mobileDetailHeading}>기차</p>
                    <p>경강선 여주역 전철</p>
                    <p>(여주역에서 사무국까지 4.5km거리)</p>
                  </div>
                  <div>
                    <p className={styles.mobileDetailHeading}>택시</p>
                    <p>도착지 : 금은모래 캠핑장 폰박물관</p>
                  </div>
                  <div>
                    <p className={styles.mobileDetailHeading}>시내버스</p>
                    <p>청솔가든 정류장 하차 (913번, 913-2번 등)</p>
                    <p>(하차 후 약 15분 도보 이동)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ReservationPage({ className = "" }: ReservationPageProps) {
  const pageClassName = className ? `${styles.page} ${className}` : styles.page;

  return (
    <div className={styles.surface} data-responsive-page="reservation">
      <main className={pageClassName} data-node-id="38:860" data-name="04_Landing">
        <div className={styles.desktopPageContent}>
          <header className={styles.header} aria-label="Site navigation">
            <a className={styles.logoLink} href={withBasePath("/")} aria-label="여주 바이크 홈">
              <img className={styles.logoImage} src={logoImage} alt="" />
            </a>
            <nav className={styles.navigation}>
              <a className={styles.navItem} href={withBasePath("/")}>
                투어 소개
              </a>
              <a className={styles.navItem} href={withBasePath("/courses/")}>
                코스 안내
              </a>
              <a className={`${styles.navItem} ${styles.activeNavItem}`} href={withBasePath("/reservation/")}>
                투어 예약
              </a>
            </nav>
          </header>

          <section className={styles.reservationIntro} aria-labelledby="reservation-title">
            <div className={styles.copyBlock}>
              <h1 className={styles.pageTitle} id="reservation-title">
                투어 예약
              </h1>
              <div className={styles.description}>
                <p>원하시는 투어 코스를 선택해 예약 폼을 작성해 주세요.</p>
                <p>담당자가 확인 후, 예약 확정 및 안내 문자를 빠르게 발송해드립니다. </p>
              </div>
            </div>

            <div className={styles.cardGrid} aria-label="투어 코스 선택">
              {tourCards.map((card) => (
                <ReservationTourCard card={card} key={card.title} />
              ))}
            </div>
          </section>

          <section className={styles.directions} aria-labelledby="directions-title">
            <div className={styles.directionsHeader}>
              <h2 className={styles.sectionTitle} id="directions-title">
                따르릉으로 오시는 길
              </h2>
              <div className={styles.addressRow}>
                <img className={styles.pinIcon} src={pinIcon} alt="" />
                <p>경기도 여주시 강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방</p>
              </div>
            </div>

            <div className={styles.transportGroup}>
              <div className={styles.carBlock}>
                <div className={styles.carIconFrame}>
                  <img className={styles.carIcon} src={carIcon} alt="" />
                </div>
                <div className={styles.transportCopy}>
                  <h3>자가 이용 시</h3>
                  <div className={styles.carDetails}>
                    <div className={styles.parkingColumn}>
                      <p className={styles.detailHeading}>유료</p>
                      <p>금은모래캠핑장 2주차장</p>
                      <p>(경기도 여주시 강변유원지길 107)</p>
                    </div>
                    <div className={styles.parkingColumn}>
                      <p className={styles.detailHeading}>무료</p>
                      <p>공원 주차장</p>
                      <p>(경기도 여주시 강변유원지길 164)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.transitBlock}>
                <div className={styles.trainIconFrame}>
                  <img className={styles.trainIcon} src={trainIcon} alt="" />
                </div>
                <div className={styles.transportCopy}>
                  <h3>대중교통 이용 시</h3>
                  <div className={styles.transitDetails}>
                    <div className={styles.transitColumn}>
                      <p className={styles.detailHeading}>기차</p>
                      <p>경강선 여주역 전철</p>
                      <p>(여주역에서 사무국까지 4.5km거리)</p>
                    </div>
                    <div className={styles.transitColumn}>
                      <p className={styles.detailHeading}>택시</p>
                      <p>도착지 : 금은모래 캠핑장 폰박물관</p>
                    </div>
                    <div className={styles.transitColumn}>
                      <p className={styles.detailHeading}>시내버스</p>
                      <p>청솔가든 정류장 하차 (913번, 913-2번 등)</p>
                      <p>(하차 후 약 15분 도보 이동)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <MobileReservationPage />
      </main>
    </div>
  );
}
