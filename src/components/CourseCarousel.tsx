"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import styles from "./CourseCarousel.module.css";

type CourseCarouselProps = {
  courseName: string;
  slides: readonly [string, string, string, string, string];
  priority?: boolean;
};

type DragAxis = "pending" | "horizontal" | "vertical";
type PointerOrigin = { pointerId: number; x: number; y: number; axis: DragAxis } | null;

export default function CourseCarousel({ courseName, slides, priority = false }: CourseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(() => new Set([0, 1]));
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;

    pointerOrigin.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      axis: "pending",
    };
    setDragOffset(0);
    setIsDragging(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "mouse") event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = pointerOrigin.current;
    if (!origin || origin.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    const absoluteX = Math.abs(deltaX);
    const absoluteY = Math.abs(deltaY);

    if (origin.axis === "pending") {
      if (Math.max(absoluteX, absoluteY) < 6) return;
      origin.axis = absoluteX > absoluteY ? "horizontal" : "vertical";
    }

    if (origin.axis !== "horizontal") return;

    event.preventDefault();
    const pullingPastStart = activeIndex === 0 && deltaX > 0;
    const pullingPastEnd = activeIndex === lastIndex && deltaX < 0;
    setDragOffset((pullingPastStart || pullingPastEnd) ? deltaX * 0.24 : deltaX);
    setIsDragging(true);
  };

  const finishPointerGesture = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const origin = pointerOrigin.current;
    if (!origin || origin.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - origin.x;
    const deltaY = event.clientY - origin.y;
    const horizontalGesture = origin.axis === "horizontal"
      || (origin.axis === "pending" && Math.abs(deltaX) > Math.abs(deltaY));
    const threshold = Math.min(48, Math.max(24, event.currentTarget.clientWidth * 0.08));

    pointerOrigin.current = null;
    setDragOffset(0);
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!cancelled && horizontalGesture && Math.abs(deltaX) >= threshold) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    finishPointerGesture(event);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    finishPointerGesture(event, true);
  };

  const handleLostPointerCapture = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerOrigin.current?.pointerId !== event.pointerId) return;
    pointerOrigin.current = null;
    setDragOffset(0);
    setIsDragging(false);
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
      <div
        className={styles.viewport}
        data-carousel-viewport
        data-dragging={isDragging ? "true" : "false"}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handleLostPointerCapture}
      >
        <div
          className={`${styles.track} ${isDragging ? styles.trackDragging : ""}`}
          style={{ transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)` }}
          data-carousel-track
        >
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
