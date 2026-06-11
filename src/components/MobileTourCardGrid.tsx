"use client";

import { useState } from "react";
import { getTourReservationUrl } from "@/lib/tourLinks";
import { lazyImageAttrs } from "@/lib/imageAttrs";
import { mobileTourCards, type MobileTourCard } from "@/lib/mobileTourCards";
import styles from "./MobileTourCardGrid.module.css";

type MobileTourCardGridProps = {
  mode: "courses" | "reservation";
};

type MobileTourCardViewProps = {
  card: MobileTourCard;
  mode: MobileTourCardGridProps["mode"];
  isStatusVisible: boolean;
  onDisabledActivate: (anchor: string) => void;
  onDisabledDeactivate: () => void;
};

function MobileTourCardView({ card, mode, isStatusVisible, onDisabledActivate, onDisabledDeactivate }: MobileTourCardViewProps) {
  const reservationUrl = getTourReservationUrl(card.anchor);
  const href = mode === "courses" ? card.courseHref : reservationUrl;
  const isDisabled = !href;
  const usesFigmaMediaImage = Boolean(card.figmaMediaImageSrc);
  const usesReservationImage = mode === "reservation" && !usesFigmaMediaImage;
  const imageSrc = usesFigmaMediaImage
    ? (card.figmaMediaImageSrc ?? card.imageSrc)
    : usesReservationImage
      ? (card.reservationImageSrc ?? card.imageSrc)
      : card.imageSrc;
  const imageWidth = usesFigmaMediaImage
    ? (card.figmaMediaImageWidth ?? card.imageWidth)
    : usesReservationImage
      ? (card.reservationImageWidth ?? card.imageWidth)
      : card.imageWidth;
  const imageHeight = usesFigmaMediaImage
    ? (card.figmaMediaImageHeight ?? card.imageHeight)
    : usesReservationImage
      ? (card.reservationImageHeight ?? card.imageHeight)
      : card.imageHeight;
  const imageClassName = usesFigmaMediaImage ? styles.figmaMediaImage : usesReservationImage ? styles.reservationImage : styles[card.cropClassName];
  const className = `${styles.card} ${usesFigmaMediaImage ? styles.figmaMediaCard : ""} ${isDisabled ? styles.disabled : ""}`;
  const titleLineClassName = [styles.titleLine, card.hasEmbeddedTitle ? styles.embeddedTitleLine : ""].filter(Boolean).join(" ");
  const content = (
    <>
      <div className={styles.media}>
        <img className={imageClassName} src={imageSrc} alt="" width={imageWidth} height={imageHeight} {...lazyImageAttrs} />
        <div className={styles.blur} />
        <div className={`${styles.gradient} ${styles[card.gradientClassName]}`} />
      </div>
      <h2 className={styles.title}>
        {card.titleLines.map((line) => (
          <span className={titleLineClassName} key={line}>
            {line}
          </span>
        ))}
      </h2>
      {isDisabled && mode === "reservation" ? (
        <span className={styles.status} aria-hidden="true">
          준비 중입니다
        </span>
      ) : null}
    </>
  );

  if (isDisabled) {
    return (
      <button
        className={className}
        type="button"
        aria-label={`${card.plainTitle} 예약 준비 중입니다`}
        data-status-visible={isStatusVisible ? "true" : undefined}
        onClick={() => onDisabledActivate(card.anchor)}
        onFocus={() => onDisabledActivate(card.anchor)}
        onBlur={onDisabledDeactivate}
      >
        {content}
      </button>
    );
  }

  return (
    <a className={className} href={href} aria-label={`${card.plainTitle} ${mode === "courses" ? "코스 안내 보기" : "예약하기"}`}>
      {content}
    </a>
  );
}

export default function MobileTourCardGrid({ mode }: MobileTourCardGridProps) {
  const [activeDisabledAnchor, setActiveDisabledAnchor] = useState<string | null>(null);
  const modeClassName = mode === "courses" ? styles.courses : "";
  const reservationClassName = mode === "reservation" ? styles.reservation : "";

  return (
    <div className={[styles.grid, modeClassName, reservationClassName].filter(Boolean).join(" ")} aria-label={mode === "courses" ? "투어 코스 안내" : "투어 코스 선택"}>
      {mobileTourCards.map((card) => (
        <MobileTourCardView
          card={card}
          mode={mode}
          isStatusVisible={activeDisabledAnchor === card.anchor}
          onDisabledActivate={setActiveDisabledAnchor}
          onDisabledDeactivate={() => setActiveDisabledAnchor(null)}
          key={card.anchor}
        />
      ))}
    </div>
  );
}
