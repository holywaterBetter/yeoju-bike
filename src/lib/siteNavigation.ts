import { withBasePath } from "./sitePaths";

export const siteNavigationItems = [
  { key: "landing", label: "투어 소개", href: withBasePath("/") },
  { key: "courses", label: "코스 안내", href: withBasePath("/courses/") },
  { key: "reservation", label: "투어 예약", href: withBasePath("/reservation/") },
] as const;

export type SiteNavigationKey = (typeof siteNavigationItems)[number]["key"];
