import SitePageShell from "@/components/SitePageShell";
import { withBasePath } from "@/lib/sitePaths";
import { parkingDirections, transitDirections, visitDisplayAddressLines, visitLocation } from "@/lib/visitInfo";
import KakaoMap from "./KakaoMap";
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
    <SitePageShell page="directions" active="directions" className={[styles.surface, className].filter(Boolean).join(" ")}>
      <main className={styles.main}>
        <section aria-labelledby="directions-title">
          <header className={styles.heading}>
            <h1 id="directions-title">따르릉으로 오시는 길</h1>
            <div className={styles.address}>
              <img src={assets.pin} alt="" width={22} height={29} aria-hidden="true" />
              <p>
                {visitDisplayAddressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
          </header>

          <KakaoMap
            className={styles.mapFrame}
            latitude={visitLocation.latitude}
            longitude={visitLocation.longitude}
            placeName={visitLocation.name}
            fallbackImage={assets.map}
          />

          <div className={styles.transport}>
            <TransportSection icon={assets.car} iconAlt="" title="자가 이용 시" columns={parkingDirections} kind="parking" />
            <TransportSection icon={assets.train} iconAlt="" title="대중교통 이용 시" columns={transitDirections} kind="transit" />
          </div>
        </section>
      </main>
    </SitePageShell>
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
    <section className={styles.transportSection} aria-labelledby={`${kind}-title`} data-visual-id={`${kind}-directions`}>
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
