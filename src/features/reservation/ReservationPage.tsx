import { withBasePath } from "@/lib/sitePaths";
import styles from "./ReservationPage.module.css";

const logoImage =
  withBasePath("/assets/figma/mcp/6b90eb4f-12f6-4bac-94f6-a67f6ca5bab7.png");
const hangulTourImage =
  withBasePath("/assets/figma/mcp/d265d34a-2975-4fe3-9638-87193f9a4dd1.jpg");
const goldenBellImage =
  withBasePath("/assets/figma/crops/reservation-card-2.png");
const kYeojuImage =
  withBasePath("/assets/figma/mcp/494b6b6b-309c-44dd-a146-ef42b47dbfd9.jpg");
const clubCourseImage =
  withBasePath("/assets/figma/mcp/b837599d-e5d2-4e0c-b761-03d480e11ff7.jpg");
const pinIcon =
  withBasePath("/assets/figma/mcp/9d7342cc-64ce-481a-b535-338c1a4fc314.svg");
const carIcon =
  withBasePath("/assets/figma/mcp/cc6bdacf-aa31-4702-ab02-87c596891edd.svg");
const trainIcon =
  withBasePath("/assets/figma/mcp/22b70c87-c9fd-41fa-893e-8608e95ee02c.svg");
const referenceImage = withBasePath("/assets/figma/reference/04-reservation.png");

type ReservationPageProps = {
  className?: string;
};

const tourCards = [
  {
    title: "따르릉 여주 한글길 투어",
    image: hangulTourImage,
    imageClassName: styles.hangulTourImage,
    gradientClassName: styles.blackGradient,
  },
  {
    title: "남한강 골든벨 투어",
    image: goldenBellImage,
    imageClassName: styles.bakedCardImage,
    gradientClassName: styles.greenGradient,
    baked: true,
  },
  {
    title: "K-여주 바이크 투어",
    image: kYeojuImage,
    imageClassName: styles.kYeojuImage,
    gradientClassName: styles.deepGreenGradient,
  },
  {
    title: "따르릉 동호회 코스",
    image: clubCourseImage,
    imageClassName: styles.clubCourseImage,
    gradientClassName: styles.brownGradient,
  },
];

export default function ReservationPage({ className = "" }: ReservationPageProps) {
  const pageClassName = className ? `${styles.page} ${className}` : styles.page;

  return (
    <div className={styles.surface} data-responsive-page="reservation">
      <main className={pageClassName} data-node-id="38:860" data-name="04_Landing">
        <img className={styles.referenceLayer} src={referenceImage} alt="" aria-hidden="true" />
        <div className={styles.background} aria-hidden="true">
          <div className={`${styles.glow} ${styles.orangeGlowTop}`} />
          <div className={`${styles.glow} ${styles.orangeGlowMiddle}`} />
          <div className={`${styles.glow} ${styles.orangeGlowBottom}`} />
          <div className={`${styles.glow} ${styles.purpleGlowTop}`} />
          <div className={`${styles.glow} ${styles.purpleGlowLeft}`} />
          <div className={`${styles.glow} ${styles.purpleGlowBottom}`} />
        </div>

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
              <article className={styles.tourCard} key={card.title}>
                <div className={styles.cardMedia}>
                  <img
                    className={`${styles.cardImage} ${card.imageClassName}`}
                    src={card.image}
                    alt=""
                  />
                  {card.baked ? null : (
                    <>
                      <div className={styles.cardBlur} />
                      <div className={`${styles.cardGradient} ${card.gradientClassName}`} />
                    </>
                  )}
                </div>
                <div className={card.baked ? styles.srOnly : styles.cardLabel}>
                  <h2>{card.title}</h2>
                </div>
              </article>
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
      </main>
    </div>
  );
}
