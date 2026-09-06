"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import styles from "./CourseCarousel.module.css";

type CourseCarouselProps = {
  courseName: string;
  slides: readonly [string, string, string, string, string];
  priority?: boolean;
};

type PointerOrigin = { x: number; y: number } | null;

export default function CourseCarousel({ courseName, slides, priority = false }: CourseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(() => new Set([0, 1]));
  const pointerOrigin = useRef<PointerOrigin>(null);
  const lastIndex = slides.length - 1;

  const goTo = (requestedIndex: number) => {
    const nextIndex = Math.min(lastIndex, Math.max(0, requestedIndex));
    setActiveIndex(nextIndex);
    setLoadedIndexes((current) => {
      const next = new Set(current);
      next.add(nextIndex);
      if (nextIndex > 0) next.add(nextIndex - 1);
      if (nextIndex < lastIndex) next.add(nextIndex + 1);
      return next;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(lastIndex);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerOrigin.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const origin = pointerOrigin.current;
    pointerOrigin.current = null;
    if (!origin) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    goTo(activeIndex + (deltaX < 0 ? 1 : -1));
  };

  const handleSelectorClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = Math.min(rect.width, Math.max(0, event.clientX - rect.left));
    goTo(Math.round((relativeX / rect.width) * lastIndex));
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${courseName} 카드뉴스`}
      aria-describedby={`${courseName.replace(/\s+/g, "-")}-carousel-status`}
      data-course-carousel={courseName}
    >
      <div className={styles.viewport} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => (pointerOrigin.current = null)}>
        <div className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((src, index) => (
            <div
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slides.length}`}
              aria-hidden={index !== activeIndex}
              key={src}
            >
              {loadedIndexes.has(index) ? (
                <img
                  src={src}
                  alt={`${courseName} 카드뉴스 ${index + 1}번째 장`}
                  width={1080}
                  height={1080}
                  loading={priority && index === 0 ? "eager" : "lazy"}
                  fetchPriority={priority && index === 0 ? "high" : "auto"}
                  draggable={false}
                />
              ) : (
                <div className={styles.placeholder} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className={styles.selector}
        role="slider"
        tabIndex={0}
        aria-label={`${courseName} 카드뉴스 슬라이드 선택`}
        aria-valuemin={1}
        aria-valuemax={slides.length}
        aria-valuenow={activeIndex + 1}
        aria-valuetext={`${activeIndex + 1} / ${slides.length}`}
        onClick={handleSelectorClick}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.dots} aria-hidden="true" data-carousel-dots>
          {slides.map((src, index) => (
            <span
              className={styles.dot}
              aria-current={index === activeIndex ? "true" : undefined}
              data-carousel-dot={index}
              key={src}
            />
          ))}
        </span>
      </div>

      <p id={`${courseName.replace(/\s+/g, "-")}-carousel-status`} className={styles.srOnly} aria-live="polite">
        {activeIndex + 1} / {slides.length}
      </p>
    </div>
  );
}
