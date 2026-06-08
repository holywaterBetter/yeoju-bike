"use client";

import { useEffect, useId, useState } from "react";
import { withBasePath } from "@/lib/sitePaths";
import styles from "./MobileSiteHeader.module.css";

export type MobileSiteHeaderActive = "landing" | "courses" | "reservation";

type MobileSiteHeaderProps = {
  active: MobileSiteHeaderActive;
};

const logoImage = withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png");
const menuSortIcon = withBasePath("/assets/figma/mobile/menu-sort.png");
const menuArrowIcon = withBasePath("/assets/figma/mobile/menu-arrow.png");

const menuItems: {
  active: MobileSiteHeaderActive;
  label: string;
  href: string;
}[] = [
  { active: "landing", label: "투어 소개", href: withBasePath("/") },
  { active: "courses", label: "코스 안내", href: withBasePath("/courses/") },
  { active: "reservation", label: "투어 예약", href: withBasePath("/reservation/") },
];

export default function MobileSiteHeader({ active }: MobileSiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header} data-name="header">
        <a className={styles.logo} href={withBasePath("/")} aria-label="따르릉 여주 홈">
          <img src={logoImage} alt="따르릉 여주 로고" />
        </a>
        <button
          className={styles.button}
          type="button"
          aria-label="메뉴 열기"
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <img className={styles.icon} src={menuSortIcon} alt="" aria-hidden="true" />
        </button>
      </header>

      <div
        id={menuId}
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.backdrop} />
        <header className={styles.overlayHeader} data-name="header">
          <a className={styles.logo} href={withBasePath("/")} aria-label="따르릉 여주 홈" onClick={() => setIsMenuOpen(false)}>
            <img src={logoImage} alt="따르릉 여주 로고" />
          </a>
          <button className={styles.button} type="button" aria-label="메뉴 닫기" onClick={() => setIsMenuOpen(false)}>
            <img className={styles.icon} src={menuArrowIcon} alt="" aria-hidden="true" />
          </button>
        </header>
        <nav className={styles.menuNav} aria-label="모바일 주요 메뉴">
          {menuItems.map((item) => {
            const isActive = item.active === active;

            return (
              <a
                className={isActive ? styles.active : undefined}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                key={item.active}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
