import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/600.css";
import "@fontsource/noto-sans-kr/700.css";
import "@fontsource/noto-sans-kr/800.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import { absoluteSiteUrl, siteDescription, siteKeywords, siteName, siteTitle, siteUrl } from "@/lib/siteMetadata";
import { withBasePath } from "@/lib/sitePaths";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteTitle} | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName,
    title: `${siteTitle} | ${siteName}`,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: absoluteSiteUrl("/assets/figma/groups/landing-hero-group.png"),
        alt: "여주 자전거 시티투어 라이딩",
      },
    ],
  },
};

type SiteShellStyle = CSSProperties & {
  "--site-bg": string;
};

const siteShellStyle: SiteShellStyle = {
  "--site-bg": `url("${withBasePath("/assets/figma/groups/landing-bg.png")}")`
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="5f5bfe3cf5cdfbf2f3f38a69b5fea26051d14069" />
        <link rel="icon" href={withBasePath("/favicon.png")} sizes="512x512" type="image/png" />
      </head>
      <body>
        <div className="site-shell" style={siteShellStyle}>
          {children}
        </div>
      </body>
    </html>
  );
}
