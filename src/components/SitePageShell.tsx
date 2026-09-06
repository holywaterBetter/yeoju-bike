import type { ReactNode } from "react";
import type { SiteNavigationKey } from "@/lib/siteNavigation";
import ContactFooter from "./ContactFooter";
import SiteHeader from "./SiteHeader";
import styles from "./SitePageShell.module.css";

type SitePageShellProps = {
  page: "landing" | "courses" | "directions";
  active: SiteNavigationKey;
  children: ReactNode;
  className?: string;
};

export default function SitePageShell({ page, active, children, className }: SitePageShellProps) {
  return (
    <div className={[styles.page, className].filter(Boolean).join(" ")} data-responsive-page={page}>
      <div className={styles.backdrop} data-page-backdrop>
        <SiteHeader active={active} />
        {children}
      </div>
      <ContactFooter />
    </div>
  );
}
