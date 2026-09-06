import type { ReactNode } from "react";
import SitePageShell from "@/components/SitePageShell";
import { withBasePath } from "@/lib/sitePaths";
import { tourCatalog } from "@/lib/tours";
import styles from "./LandingPage.module.css";

const assets = {
  riverHero: withBasePath("/assets/figma/groups/landing-river-hero-frame.webp"),
  riverCardOne: withBasePath("/assets/figma/groups/landing-river-card-one-frame.webp"),
  riverCardOneMobile: withBasePath("/assets/figma/mobile/tour-card-golden-river-mobile.webp"),
  riverCardTwo: withBasePath("/assets/figma/groups/landing-river-card-two-frame.webp"),
  riverCardTwoMobile: withBasePath("/assets/figma/mcp/7126efd5-5893-4db5-a348-932564b7fd20-mobile.webp"),
  featureOne: withBasePath("/assets/figma/groups/landing-feature-one-frame.webp"),
  featureOneMobile: withBasePath("/assets/figma/groups/landing-feature-one-frame.webp"),
  featureTwo: withBasePath("/assets/figma/groups/landing-feature-two-frame.webp"),
  featureTwoMobile: withBasePath("/assets/figma/mcp/c57dbe85-295b-4130-9b84-401993be52c4-mobile.webp"),
  featureThree: withBasePath("/assets/figma/groups/landing-feature-three-frame.webp"),
  featureThreeMobile: withBasePath("/assets/figma/mcp/da8bc77c-6a74-4345-98b6-f0941f96579e-mobile.webp"),
  yellowSpark: withBasePath("/assets/figma/groups/landing-yellow-spark.png"),
  smile: withBasePath("/assets/figma/groups/landing-smile.png"),
  guideMark: withBasePath("/assets/figma/mcp/7424fa6c-9d52-426c-acf0-36708e7cc0ff.svg"),
  guideUnderline: withBasePath("/assets/figma/mcp/17b7eb28-4867-4d74-a8bd-e6899da0f967.svg"),
  senaSquiggle: withBasePath("/assets/figma/mcp/1fb74ddd-3cfd-4e66-a342-349511268172.svg"),
  redDashOne: withBasePath("/assets/figma/groups/landing-red-dash-1.png"),
  redDashTwo: withBasePath("/assets/figma/groups/landing-red-dash-2.png"),
};

type LandingPageProps = { className?: string };

export default function LandingPage({ className }: LandingPageProps) {
  return (
    <SitePageShell page="landing" active="landing" className={[styles.surface, className].filter(Boolean).join(" ")}>
      <main>
        <Hero />
        <RiverSection />
        <SpecialSection />
        <JourneySection />
      </main>
    </SitePageShell>
  );
}

function Hero() {
  return (
    <section className={`${styles.sectionInner} ${styles.hero}`} aria-labelledby="landing-title" data-visual-id="landing-hero">
      <h1 id="landing-title">달리자! 다채로운 여주 속으로</h1>
      <p>
        역사의 숨결이 느껴지는 남한강변을 따라 즐기는 2026 여주 자전거 시티투어
        <br />
        해설 투어부터 자율 완주 챌린지까지, 나만의 특별한 여주 라이딩을 만나보세요!
      </p>
    </section>
  );
}

function RiverSection() {
  return (
    <section className={`${styles.sectionInner} ${styles.riverSection}`} aria-labelledby="river-title" data-visual-id="landing-river">
      <div className={styles.riverIntro}>
        <h2 id="river-title">
          두 바퀴로 만나는
          <img className={styles.riverSpark} src={assets.yellowSpark} alt="" width={172} height={109} aria-hidden="true" />
          <br />
          남한강의 선물
          <br />
          그리고 세종대왕
        </h2>
        <p>
          &quot;자전거를 타기 위해 만들어진 도시가 아닐까?&quot; 여주 남한강변을 한 번이라도 달려본 분들이라면 모두 고개를 끄덕이실 겁니다. 여주는 탁 트인 자연과 깊은 역사가 평탄한 길 위에 나란히 놓여 있어, 자전거 여행에 최적화된 완벽한 무대입니다.
        </p>
      </div>

      <ResponsiveImage
        className={styles.riverHero}
        desktopSrc={assets.riverHero}
        mobileSrc={assets.riverHero}
        alt="노을이 비치는 남한강변 자전거길을 달리는 라이더"
        width={1200}
        height={706}
      />

      <div className={styles.riverCards}>
        <article>
          <ResponsiveImage desktopSrc={assets.riverCardOne} mobileSrc={assets.riverCardOneMobile} alt="남한강변의 평탄한 자전거 코스" width={600} height={350} />
          <h3>남한강에서 편안하게 <br />달릴 수 있는 자전거 코스</h3>
        </article>
        <article>
          <ResponsiveImage desktopSrc={assets.riverCardTwo} mobileSrc={assets.riverCardTwoMobile} alt="한글과 세종대왕의 이야기를 만나는 문화유산" width={560} height={350} />
          <h3>한글의 자음을 따라 달리는 <br />지붕 없는 박물관</h3>
        </article>
      </div>
    </section>
  );
}

function SpecialSection() {
  return (
    <section className={`${styles.sectionInner} ${styles.specialSection}`} aria-labelledby="special-title" data-visual-id="landing-special">
      <h2 id="special-title" className={styles.centeredTitle}>따르릉 투어의 특별함 세 가지</h2>
      <div className={styles.featureList}>
        <FeatureRow
          desktopSrc={assets.featureOne}
          mobileSrc={assets.featureOneMobile}
          imageAlt="PAS 전기자전거로 달리는 참가자"
          title={
            <>
              힘들이지 않고 가뿐하게,
              <img className={styles.smileDecoration} src={assets.smile} alt="" width={76} height={76} aria-hidden="true" />
              <br />
              PAS 전기자전거
            </>
          }
        >
          페달을 밟으면 모터가 힘을 더해주는 PAS 전용 전기자전거를 이용합니다. 가파른 오르막이나 체력 부담 걱정 없이, 남한강 자전거길의 평지 코스를 누구나 여유롭고 안전하게 완주할 수 있습니다.
        </FeatureRow>

        <FeatureRow
          reversed
          desktopSrc={assets.featureTwo}
          mobileSrc={assets.featureTwoMobile}
          imageAlt="가이드 크루와 함께 안전하게 달리는 참가자"
          title={
            <>
              <img className={styles.guideMarkDecoration} src={assets.guideMark} alt="" width={71} height={88} aria-hidden="true" />
              안전과 감동을 책임지는
              <br />
              가이드 크루
              <img className={styles.guideUnderlineDecoration} src={assets.guideUnderline} alt="" width={216} height={40} aria-hidden="true" />
            </>
          }
        >
          전문 가이드가 대열의 선두와 후미에서 밀착 동행합니다. 안전 관리부터 명소 해설까지 투어의 처음과 끝을 든든하게 지켜드립니다.
        </FeatureRow>

        <FeatureRow
          desktopSrc={assets.featureThree}
          mobileSrc={assets.featureThreeMobile}
          imageAlt="세나 인터콤이 장착된 헬멧을 착용한 참가자"
          imageDecoration={<img className={styles.senaSquiggleDecoration} src={assets.senaSquiggle} alt="" width={123} height={40} aria-hidden="true" />}
          title={
            <>
              달리는 라디오,
              <img className={styles.redDashOne} src={assets.redDashOne} alt="" width={22} height={38} aria-hidden="true" />
              <img className={styles.redDashTwo} src={assets.redDashTwo} alt="" width={41} height={19} aria-hidden="true" />
              <br />
              세나 인터콤
            </>
          }
        >
          특수 헬멧에 장착된 인터콤 시스템을 활용하여, 주행 중에도 가이드의 실시간 길 안내와 흥미진진한 여주 역사 이야기를 라디오 방송처럼 생생하게 들으며 즐길 수 있습니다.
        </FeatureRow>
      </div>
    </section>
  );
}

type FeatureRowProps = {
  desktopSrc: string;
  mobileSrc: string;
  imageAlt: string;
  title: ReactNode;
  children: ReactNode;
  reversed?: boolean;
  imageDecoration?: ReactNode;
};

function FeatureRow({ desktopSrc, mobileSrc, imageAlt, title, children, reversed = false, imageDecoration }: FeatureRowProps) {
  return (
    <article className={`${styles.featureRow} ${reversed ? styles.reversed : ""}`}>
      <div className={styles.featureImage}>
        <ResponsiveImage desktopSrc={desktopSrc} mobileSrc={mobileSrc} alt={imageAlt} width={540} height={350} />
        {imageDecoration}
      </div>
      <div className={styles.featureCopy}>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function JourneySection() {
  return (
    <section className={`${styles.sectionInner} ${styles.journeySection}`} aria-labelledby="journey-title" data-visual-id="landing-journeys">
      <h2 id="journey-title" className={styles.centeredTitle}>이야기를 따라 달리는 4가지 여정</h2>
      <div className={styles.journeyGrid}>
        {tourCatalog.map((tour) => (
          <a className={styles.journeyCard} href={tour.courseHref} key={tour.anchor} aria-label={`${tour.title} 코스와 예약 보기`}>
            <picture>
              <source media="(max-width: 767px)" srcSet={tour.landingMedia.mobile} />
              <img src={tour.landingMedia.desktop} alt="" width={585} height={286} loading="lazy" />
            </picture>
            <h3>{tour.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

type ResponsiveImageProps = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

function ResponsiveImage({ desktopSrc, mobileSrc, alt, width, height, className }: ResponsiveImageProps) {
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      <img src={desktopSrc} alt={alt} width={width} height={height} loading="lazy" />
    </picture>
  );
}
