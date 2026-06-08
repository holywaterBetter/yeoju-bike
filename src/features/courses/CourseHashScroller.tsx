"use client";

import { useLayoutEffect } from "react";
import { type CourseAnchor, courseAnchors } from "@/lib/courseAnchors";

const validScrollAnchors = new Set<CourseAnchor>(
  Object.values(courseAnchors).filter((anchor) => anchor !== courseAnchors.hangul),
);

function resetCourseContainerScroll() {
  document.querySelectorAll<HTMLElement>('[data-responsive-page="courses"]').forEach((element) => {
    element.scrollTop = 0;
  });
}

function getVisibleCourseSection(anchor: CourseAnchor) {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-course-anchor]")).find(
    (element) => element.dataset.courseAnchor === anchor && element.getClientRects().length > 0,
  );
}

export default function CourseHashScroller() {
  useLayoutEffect(() => {
    function scrollToCurrentHash() {
      const hash = decodeURIComponent(window.location.hash.slice(1));

      resetCourseContainerScroll();

      if (hash === courseAnchors.hangul) {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        resetCourseContainerScroll();
        return;
      }

      if (!validScrollAnchors.has(hash as CourseAnchor)) {
        return;
      }

      requestAnimationFrame(() => {
        resetCourseContainerScroll();

        const section = getVisibleCourseSection(hash as CourseAnchor);

        if (!section) {
          return;
        }

        const scrollMarginTop = Number.parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
        const top = Math.max(0, window.scrollY + section.getBoundingClientRect().top - scrollMarginTop);

        window.scrollTo({ top, left: 0, behavior: "smooth" });
        resetCourseContainerScroll();
      });
    }

    scrollToCurrentHash();
    window.addEventListener("hashchange", scrollToCurrentHash);
    window.addEventListener("popstate", scrollToCurrentHash);

    return () => {
      window.removeEventListener("hashchange", scrollToCurrentHash);
      window.removeEventListener("popstate", scrollToCurrentHash);
    };
  }, []);

  return null;
}
