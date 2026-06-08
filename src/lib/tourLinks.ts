import { type CourseAnchor, courseAnchors } from "./courseAnchors";

export const kakaoChannelUrl = "https://pf.kakao.com/_NxgwUn";

export const tourReservationUrls: Partial<Record<CourseAnchor, string>> = {
  [courseAnchors.hangul]: "https://form.naver.com/response/v7niAyUhIlKeoY2YjUv2ww",
  [courseAnchors.goldenBell]: "https://form.naver.com/response/zN4F5ETAfQtFaA7o8z5uUQ",
};

export function getTourReservationUrl(anchor: CourseAnchor) {
  return tourReservationUrls[anchor];
}
