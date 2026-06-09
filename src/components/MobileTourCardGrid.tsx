import { getTourReservationUrl } from "@/lib/tourLinks";
import { mobileTourCards, type MobileTourCard } from "@/lib/mobileTourCards";
import styles from "./MobileTourCardGrid.module.css";

type MobileTourCardGridProps = {
  mode: "courses" | "reservation";
};

function MobileTourCardView({ card, mode }: { card: MobileTourCard; mode: MobileTourCardGridProps["mode"] }) {
  const reservationUrl = getTourReservationUrl(card.anchor);
  const href = mode === "courses" ? card.courseHref : reservationUrl;
  const isDisabled = !href;
  const hasFigmaMediaImage = Boolean(card.figmaMediaImageSrc);
  const imageSrc = card.figmaMediaImageSrc ?? (mode === "reservation" ? (card.reservationImageSrc ?? card.imageSrc) : card.imageSrc);
  const imageClassName = hasFigmaMediaImage ? styles.figmaMediaImage : mode === "reservation" ? styles.reservationImage : styles[card.cropClassName];
  const className = `${styles.card} ${hasFigmaMediaImage ? styles.figmaMediaCard : ""} ${isDisabled ? styles.disabled : ""}`;
  const content = (
    <>
      <div className={styles.media}>
        <img className={imageClassName} src={imageSrc} alt="" />
        <div className={styles.blur} />
        <div className={`${styles.gradient} ${styles[card.gradientClassName]}`} />
      </div>
      <h2 className={styles.title}>
        {card.titleLines.map((line) => (
          <span className={styles.titleLine} key={line}>
            {line}
          </span>
        ))}
        {isDisabled && mode === "reservation" ? <span className={styles.status}>준비 중입니다</span> : null}
      </h2>
    </>
  );

  if (isDisabled) {
    return (
      <article className={className} aria-disabled="true" tabIndex={0}>
        {content}
      </article>
    );
  }

  return (
    <a className={className} href={href} aria-label={`${card.plainTitle} ${mode === "courses" ? "코스 안내 보기" : "예약하기"}`}>
      {content}
    </a>
  );
}

export default function MobileTourCardGrid({ mode }: MobileTourCardGridProps) {
  const modeClassName = mode === "courses" ? styles.courses : "";
  const reservationClassName = mode === "reservation" ? styles.reservation : "";

  return (
    <div className={[styles.grid, modeClassName, reservationClassName].filter(Boolean).join(" ")} aria-label={mode === "courses" ? "투어 코스 안내" : "투어 코스 선택"}>
      {mobileTourCards.map((card) => (
        <MobileTourCardView card={card} mode={mode} key={card.anchor} />
      ))}
    </div>
  );
}
