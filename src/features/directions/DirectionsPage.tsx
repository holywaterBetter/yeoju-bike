import ContactFooter from "@/components/ContactFooter";
import RevealOnScroll from "@/components/RevealOnScroll";
import SiteHeader from "@/components/SiteHeader";
import { withBasePath } from "@/lib/sitePaths";
import { parkingDirections, transitDirections, visitFullAddress } from "@/lib/visitInfo";
import styles from "./DirectionsPage.module.css";

type DirectionsPageProps = { className?: string };

const assets = {
  pin: withBasePath("/assets/figma/mobile/reservation-pin.svg"),
  car: withBasePath("/assets/figma/mobile/reservation-car.svg"),
  train: withBasePath("/assets/figma/mobile/reservation-train.svg"),
  map: withBasePath("/assets/figma/260906/directions-map.png"),
};

export default function DirectionsPage({ className }: DirectionsPageProps) {
  return (
    <div className={[styles.surface, className].filter(Boolean).join(" ")} data-responsive-page="directions">
      <RevealOnScroll />
      <SiteHeader active="directions" />
      <main className={styles.main}>
        <section aria-labelledby="directions-title">
          <header className={styles.heading}>
            <h1 id="directions-title">따르릉으로 오시는 길</h1>
            <div className={styles.address}>
              <img src={assets.pin} alt="" width={22} height={29} aria-hidden="true" />
              <p>{visitFullAddress}</p>
            </div>
          </header>

          <div className={styles.mapFrame} data-reveal>
            <img src={assets.map} alt="따르릉 자전거사랑방과 주변 주차장 위치 지도" width={1247} height={777} />
          </div>

          <div className={styles.transport}>
            <TransportSection icon={assets.car} iconAlt="" title="자가 이용 시" columns={parkingDirections} kind="parking" />
            <TransportSection icon={assets.train} iconAlt="" title="대중교통 이용 시" columns={transitDirections} kind="transit" />
          </div>
        </section>
      </main>
      <ContactFooter />
    </div>
  );
}

type DirectionColumn = { readonly heading: string; readonly lines: readonly string[] };

type TransportSectionProps = {
  icon: string;
  iconAlt: string;
  title: string;
  columns: readonly DirectionColumn[];
  kind: "parking" | "transit";
};

function TransportSection({ icon, iconAlt, title, columns, kind }: TransportSectionProps) {
  return (
    <section className={styles.transportSection} aria-labelledby={`${kind}-title`} data-reveal>
      <div className={styles.transportHeading}>
        <img className={kind === "parking" ? styles.carIcon : styles.trainIcon} src={icon} alt={iconAlt} width={134} height={51} aria-hidden="true" />
        <h2 id={`${kind}-title`}>{title}</h2>
      </div>
      <div className={`${styles.transportGrid} ${kind === "transit" ? styles.transitGrid : ""}`}>
        {columns.map((column) => (
          <article key={column.heading}>
            <h3>{column.heading}</h3>
            {column.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
