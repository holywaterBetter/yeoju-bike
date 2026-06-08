"use client";

import { useEffect } from "react";
import { type CourseAnchor, courseAnchors } from "@/lib/courseAnchors";

const validAnchors = new Set<CourseAnchor>(Object.values(courseAnchors));

function getVisibleCourseSection(anchor: CourseAnchor) {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-course-anchor]")).find(
    (element) => element.dataset.courseAnchor === anchor && element.getClientRects().length > 0,
  );
}

export default function CourseHashScroller() {
  useEffect(() => {
    function scrollToCurrentHash() {
      const hash = decodeURIComponent(window.location.hash.slice(1));

      if (!validAnchors.has(hash as CourseAnchor)) {
        return;
      }

      requestAnimationFrame(() => {
        getVisibleCourseSection(hash as CourseAnchor)?.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
      });
    }

    const retryDelays = [0, 100, 300, 700, 1200, 1800];
    const retryTimers = retryDelays.map((delay) => window.setTimeout(scrollToCurrentHash, delay));

    window.addEventListener("hashchange", scrollToCurrentHash);
    window.addEventListener("popstate", scrollToCurrentHash);

    return () => {
      retryTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("hashchange", scrollToCurrentHash);
      window.removeEventListener("popstate", scrollToCurrentHash);
    };
  }, []);

  return null;
}
