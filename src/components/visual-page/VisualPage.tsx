import Link from "next/link";
import type { CSSProperties } from "react";
import type { FigmaPage, FigmaPageKey } from "@/data/figmaPages";
import { figmaPages } from "@/data/figmaPages";
import styles from "./VisualPage.module.css";

type VisualPageProps = {
  page: FigmaPage;
  active: FigmaPageKey;
};

const navItems: Array<{ key: FigmaPageKey; label: string; left: number; width: number }> = [
  { key: "landing", label: "투어 소개", left: 1018, width: 86 },
  { key: "courses", label: "코스 안내", left: 1125, width: 86 },
  { key: "reservation", label: "투어 예약", left: 1233, width: 92 }
];

function rectStyle(
  page: FigmaPage,
  rect: { left: number; top: number; width: number; height: number }
): CSSProperties {
  return {
    left: `${(rect.left / page.width) * 100}%`,
    top: `${(rect.top / page.height) * 100}%`,
    width: `${(rect.width / page.width) * 100}%`,
    height: `${(rect.height / page.height) * 100}%`
  };
}

export function VisualPage({ page, active }: VisualPageProps) {
  return (
    <main
      className={styles.stage}
      style={
        {
          "--design-width": `${page.width}px`,
          "--design-aspect": `${page.width} / ${page.height}`
        } as CSSProperties
      }
      data-figma-node={page.nodeId}
      data-page={page.key}
    >
      <h1 className={styles.srOnly}>{page.title}</h1>
      <p className={styles.srOnly}>{page.description}</p>
      <img
        className={styles.reference}
        src={page.imageSrc}
        alt=""
        width={page.width}
        height={page.height}
        draggable={false}
      />
      <Link
        className={styles.logoHotspot}
        href={figmaPages.landing.route}
        aria-label="따르릉 여주 홈"
        style={rectStyle(page, { left: 112, top: 28, width: 96, height: 64 })}
      />
      <nav className={styles.navHotspots} aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link
            key={item.key}
            className={styles.navHotspot}
            href={figmaPages[item.key].route}
            aria-label={item.label}
            aria-current={active === item.key ? "page" : undefined}
            style={rectStyle(page, {
              left: item.left,
              top: 34,
              width: item.width,
              height: 48
            })}
          />
        ))}
      </nav>
    </main>
  );
}
