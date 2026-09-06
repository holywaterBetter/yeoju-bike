import { withBasePath } from "./sitePaths";

export const siteNavigationItems = [
  { key: "courses", label: "코스 & 예약", href: withBasePath("/") },
  { key: "landing", label: "투어 소개", href: withBasePath("/introduce/") },
  { key: "directions", label: "오시는 길", href: withBasePath("/reservation/") },
] as const;

export type SiteNavigationKey = (typeof siteNavigationItems)[number]["key"];
