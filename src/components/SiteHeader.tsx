"use client";

import { useEffect, useId, useRef, useState } from "react";
import { siteNavigationItems, type SiteNavigationKey } from "@/lib/siteNavigation";
import { withBasePath } from "@/lib/sitePaths";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  active: SiteNavigationKey;
};

const logoImage = withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4-transparent.png");
const menuSortIcon = withBasePath("/assets/figma/mobile/menu-sort.png");
const menuArrowIcon = withBasePath("/assets/figma/mobile/menu-arrow.png");

export default function SiteHeader({ active }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header} data-site-header data-active={active}>
        <div className={styles.inner}>
          <a className={styles.logo} href={withBasePath("/")} aria-label="따르릉 여주 홈">
            <img src={logoImage} alt="따르릉 여주 로고" width={146} height={101} />
          </a>

          <nav className={styles.desktopNav} aria-label="주요 메뉴">
            {siteNavigationItems.map((item) => {
              const isActive = item.key === active;
              return (
                <a className={isActive ? styles.active : undefined} href={item.href} aria-current={isActive ? "page" : undefined} key={item.key}>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <button
            className={styles.menuButton}
            type="button"
            aria-label="메뉴 열기"
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <img src={menuSortIcon} alt="" width={37} height={32} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div id={menuId} className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`} aria-hidden={!isMenuOpen}>
        <button className={styles.backdrop} type="button" aria-label="메뉴 닫기" tabIndex={isMenuOpen ? 0 : -1} onClick={() => setIsMenuOpen(false)} />
        <div className={styles.overlayHeader}>
          <a className={styles.logo} href={withBasePath("/")} aria-label="따르릉 여주 홈" onClick={() => setIsMenuOpen(false)}>
            <img src={logoImage} alt="따르릉 여주 로고" width={146} height={101} />
          </a>
          <button ref={closeButtonRef} className={styles.menuButton} type="button" aria-label="메뉴 닫기" onClick={() => setIsMenuOpen(false)}>
            <img src={menuArrowIcon} alt="" width={37} height={32} aria-hidden="true" />
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="모바일 주요 메뉴">
          {siteNavigationItems.map((item) => {
            const isActive = item.key === active;
            return (
              <a
                className={isActive ? styles.active : undefined}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                key={item.key}
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
