import { withBasePath } from "./sitePaths";

export const courseAnchors = {
  hangul: "hangul-tour",
  goldenBell: "golden-bell-tour",
  kYeoju: "k-yeoju-tour",
  club: "club-tour",
} as const;

export type CourseAnchor = (typeof courseAnchors)[keyof typeof courseAnchors];

export function courseAnchorHref(anchor: CourseAnchor) {
  if (anchor === courseAnchors.hangul) {
    return withBasePath("/courses/");
  }

  return `${withBasePath("/courses/")}#${anchor}`;
}
