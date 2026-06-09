import MobileSiteHeader from "@/components/MobileSiteHeader";
import MobileTourCardGrid from "@/components/MobileTourCardGrid";
import RevealOnScroll from "@/components/RevealOnScroll";
import { eagerImageAttrs, lazyImageAttrs } from "@/lib/imageAttrs";
import { withBasePath } from "@/lib/sitePaths";
import { getTourReservationUrl, tourCatalog } from "@/lib/tours";
import styles from "./ReservationPage.module.css";

const logoImage =
  withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png");
const pinIcon =
  withBasePath("/assets/figma/mcp/9d7342cc-64ce-481a-b535-338c1a4fc314.svg");
const carIcon =
  withBasePath("/assets/figma/mobile/reservation-car.svg");
const trainIcon =
  withBasePath("/assets/figma/mobile/reservation-train.svg");

const mobileAssets = {
  pin: withBasePath("/assets/figma/mobile/reservation-pin.svg"),
  car: withBasePath("/assets/figma/mobile/reservation-car.svg"),
  train: withBasePath("/assets/figma/mobile/reservation-train.svg"),
};

type ReservationPageProps = {
  className?: string;
};

type TourCardData = {
  anchor: (typeof tourCatalog)[number]["anchor"];
  title: string;
  image: string;
};

const tourCards: TourCardData[] = tourCatalog.map((tour) => ({
  anchor: tour.anchor,
  title: tour.plainTitle,
  image: tour.desktopCardMedia,
}));

function ReservationTourCard({ card }: { card: TourCardData }) {
  const reservationUrl = getTourReservationUrl(card.anchor);
  const content = (
    <>
      <div className={styles.cardMedia}>
        <img
          className={`${styles.cardImage} ${styles.cardMediaImage}`}
          src={card.image}
          alt=""
          width={585}
          height={286}
          {...lazyImageAttrs}
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
      <article
        className={`${styles.tourCard} ${styles.tourCardDisabled}`}
        aria-disabled="true"
        tabIndex={0}
      >
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
      <MobileSiteHeader active="reservation" compact />
      <div className={styles.mobileContentStack}>
        <section className={styles.mobileReservationIntro} aria-labelledby="mobile-reservation-title" data-reveal>
          <div className={styles.mobileCopyBlock}>
            <h1 id="mobile-reservation-title">투어 예약</h1>
            <div>
              <p>원하시는 투어 코스를 선택해 예약 폼을 작성해 주세요.</p>
              <p>담당자가 확인 후, 예약 확정 및 안내 문자를 빠르게 발송해드립니다. </p>
            </div>
          </div>
          <MobileTourCardGrid mode="reservation" />
        </section>

        <section className={styles.mobileDirections} aria-labelledby="mobile-directions-title" data-reveal>
          <div className={styles.mobileDirectionsHeader}>
            <h2 id="mobile-directions-title">따르릉으로 오시는 길</h2>
            <div className={styles.mobileAddressRow}>
              <img src={mobileAssets.pin} alt="" width={22} height={29} {...lazyImageAttrs} />
              <p>경기도 여주시 강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방</p>
            </div>
          </div>
          <div className={styles.mobileTransportGroup}>
            <div className={styles.mobileTransportBlock}>
              <img className={styles.mobileCarIcon} src={mobileAssets.car} alt="" width={134} height={51} {...lazyImageAttrs} />
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
              <img className={styles.mobileTrainIcon} src={mobileAssets.train} alt="" width={128} height={45} {...lazyImageAttrs} />
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
      <RevealOnScroll />
      <main className={pageClassName} data-node-id="38:860" data-name="04_Landing">
        <div className={styles.desktopPageContent}>
          <header className={styles.header} aria-label="Site navigation">
            <a className={styles.logoLink} href={withBasePath("/")} aria-label="여주 바이크 홈">
              <img className={styles.logoImage} src={logoImage} alt="" width={146} height={101} {...eagerImageAttrs} />
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

          <section className={styles.reservationIntro} aria-labelledby="reservation-title" data-reveal>
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

          <section className={styles.directions} aria-labelledby="directions-title" data-reveal>
            <div className={styles.directionsHeader}>
              <h2 className={styles.sectionTitle} id="directions-title">
                따르릉으로 오시는 길
              </h2>
              <div className={styles.addressRow}>
                <img className={styles.pinIcon} src={pinIcon} alt="" width={36} height={49} {...lazyImageAttrs} />
                <p>경기도 여주시 강변유원지길 105 폰박물관 옆 따르릉 여주 사랑방</p>
              </div>
            </div>

            <div className={styles.transportGroup}>
              <div className={styles.carBlock}>
                <div className={styles.carIconFrame}>
                  <img className={styles.carIcon} src={carIcon} alt="" width={134} height={51} {...lazyImageAttrs} />
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
                  <img className={styles.trainIcon} src={trainIcon} alt="" width={128} height={45} {...lazyImageAttrs} />
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
