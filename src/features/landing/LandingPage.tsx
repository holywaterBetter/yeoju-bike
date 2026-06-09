"use client";

import { type MouseEvent, type ReactNode } from "react";
import MobileSiteHeader from "@/components/MobileSiteHeader";
import MobileTourCardGrid from "@/components/MobileTourCardGrid";
import { courseAnchorHref, courseAnchors } from "@/lib/courseAnchors";
import { withBasePath } from "@/lib/sitePaths";
import { kakaoChannelUrl } from "@/lib/tourLinks";
import styles from "./LandingPage.module.css";

const imgImage30 = withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png");
const imgKakaoTalk20250905103329489281 = withBasePath("/assets/figma/mcp/6953c77a-4366-4c08-95a5-b18a1e6a7cee.jpg");
const img001P1 = withBasePath("/assets/figma/mcp/8d01a7f6-43e6-4989-be27-7bff9861bf36.jpg");
const imgF5550E6E0A054A92B6DbAae059C455821 = withBasePath("/assets/figma/mcp/7126efd5-5893-4db5-a348-932564b7fd20.jpg");
const imgKakaoTalk202511171151172981 = withBasePath("/assets/figma/mcp/461689e3-dc4a-47ac-8fc9-7f9928a9fed4.jpg");
const imgKakaoTalk202511171152391871 = withBasePath("/assets/figma/mcp/c57dbe85-295b-4130-9b84-401993be52c4.jpg");
const imgKakaoTalk20251117115117298071 = withBasePath("/assets/figma/mcp/da8bc77c-6a74-4345-98b6-f0941f96579e.jpg");
const imgHeroBikeSource = withBasePath("/assets/figma/groups/landing-hero-bike-source.png");
const imgHeroGroup = withBasePath("/assets/figma/groups/landing-hero-group.png");
const imgImage40 = withBasePath("/assets/figma/mcp/efb2b323-a460-4830-a947-ad0427775610.png");
const imgRiverHeroFrame = withBasePath("/assets/figma/groups/landing-river-hero-frame.png");
const imgRiverCardOneFrame = withBasePath("/assets/figma/groups/landing-river-card-one-frame.png");
const imgRiverCardTwoFrame = withBasePath("/assets/figma/groups/landing-river-card-two-frame.png");
const imgFeatureOneFrame = withBasePath("/assets/figma/groups/landing-feature-one-frame.png");
const imgFeatureTwoFrame = withBasePath("/assets/figma/groups/landing-feature-two-frame.png");
const imgFeatureThreeFrame = withBasePath("/assets/figma/groups/landing-feature-three-frame.png");
const imgTourCardHangulMedia = withBasePath("/assets/figma/groups/tour-card-hangul-media.png");
const imgTourCardGoldenMedia = withBasePath("/assets/figma/groups/tour-card-golden-media.png");
const imgTourCardKYeojuMedia = withBasePath("/assets/figma/groups/tour-card-k-yeoju-media.png");
const imgTourCardClubMedia = withBasePath("/assets/figma/groups/tour-card-club-media.png");
const imgVector36 = withBasePath("/assets/figma/mcp/17b7eb28-4867-4d74-a8bd-e6899da0f967.svg");
const imgVector21 = withBasePath("/assets/figma/mcp/7424fa6c-9d52-426c-acf0-36708e7cc0ff.svg");
const imgSmile = withBasePath("/assets/figma/groups/landing-smile.png");
const imgVector20 = withBasePath("/assets/figma/mcp/1fb74ddd-3cfd-4e66-a342-349511268172.svg");
const imgRedDashOne = withBasePath("/assets/figma/groups/landing-red-dash-1.png");
const imgRedDashTwo = withBasePath("/assets/figma/groups/landing-red-dash-2.png");
const imgMobileRedDashOne = withBasePath("/assets/figma/mobile/landing-red-dash-one.svg");
const imgMobileRedDashTwo = withBasePath("/assets/figma/mobile/landing-red-dash-two.svg");
const imgYellowSpark = withBasePath("/assets/figma/groups/landing-yellow-spark.png");

type LandingPageProps = {
  className?: string;
};

const journeyCards = [
  {
    title: "따르릉 여주 한글길 투어",
    img: imgTourCardHangulMedia,
    href: courseAnchorHref(courseAnchors.hangul),
  },
  {
    title: "남한강 골든벨 투어",
    img: imgTourCardGoldenMedia,
    href: courseAnchorHref(courseAnchors.goldenBell),
  },
  {
    title: "K-여주 바이크 투어",
    img: imgTourCardKYeojuMedia,
    href: courseAnchorHref(courseAnchors.kYeoju),
  },
  {
    title: "따르릉 동호회 코스",
    img: imgTourCardClubMedia,
    href: courseAnchorHref(courseAnchors.club),
  },
];

function handleJourneyCardClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return;
  }

  event.preventDefault();
  window.location.assign(href);
}

export default function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={styles.surface} data-responsive-page="landing">
      <main className={[styles.page, className].filter(Boolean).join(" ")} data-node-id="1:52" data-name="01_Landing">
        <div className={styles.desktopLayers}>
          <Header />
          <Hero />
          <RiverSection />
          <SpecialSection />
          <JourneySection />
          <ContactCta />
        </div>
        <MobileLanding />
      </main>
    </div>
  );
}

function Header() {
  return (
    <>
      <a className={styles.logoWrap} href={withBasePath("/")} aria-label="따르릉 여주 홈" data-node-id="7:101" data-name="image 30">
        <img className={styles.fullImage} src={imgImage30} alt="따르릉 여주 로고" />
      </a>
      <nav className={styles.nav} aria-label="주요 메뉴" data-node-id="35:956">
        <a className={styles.navActive} href={withBasePath("/")} aria-current="page">투어 소개</a>
        <a href={withBasePath("/courses/")}>코스 안내</a>
        <a href={withBasePath("/reservation/")}>투어 예약</a>
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="landing-title">
      <div className={styles.heroCopy} data-node-id="1:57" data-name="Content">
        <h1 id="landing-title" className={styles.heroTitle} data-node-id="1:58">
          가이드와 함께
          <br />
          전기 자전거로 달리는
          <br />
          가장 완벽한 여주 시티투어
        </h1>
        <p className={styles.heroDescription} data-node-id="1:59">
          전기 자전거에 몸을 싣고 여주의 풍경 속으로 들어와 보세요.
          <br />
          발길이 닿지 않던 샛길부터 탁 트인 남한강변까지, 바퀴가 구르는 곳마다
          <br />
          흥미로운 이야기가 펼쳐집니다. 여주의 구석구석을 가장 잘 아는 든든한
          <br />
          '자전거 가이드'가 여러분의 안전하고 즐거운 여행을 책임집니다.
          <br />
          우리 가족, 친구, 연인과 여주에서 잊지 못할 낭만을 완성해 보세요.
        </p>
      </div>
      <div className={styles.heroArt} aria-hidden="true" data-node-id="1:199">
        <img className={styles.heroArtImage} src={imgHeroGroup} alt="" data-name="Group 162532" />
      </div>
      <YellowSpark />
    </section>
  );
}

function RiverSection() {
  return (
    <section className={styles.riverSection} aria-labelledby="river-title" data-node-id="2:474">
      <div className={styles.riverIntro} data-node-id="1:78">
        <h2 id="river-title" className={styles.sectionTitle} data-node-id="1:80">
          두 바퀴로 만나는
          <br />
          남한강의 선물
          <br />
          그리고 세종대왕
        </h2>
        <p className={styles.riverText} data-node-id="1:79">
          "자전거를 타기 위해 만들어진 도시가 아닐까?" 여주 남한강변을 한 번이라도 달려본
          분들이라면 모두 고개를 끄덕이실 겁니다. 여주는 탁 트인 자연과 깊은 역사가 평탄한
          길 위에 나란히 놓여 있어, 자전거 여행에 최적화된 완벽한 무대입니다.
        </p>
      </div>
      <div className={styles.riverHeroImage} data-node-id="2:477">
        <img className={styles.riverHeroPhoto} src={imgRiverHeroFrame} alt="남한강변 자전거길" />
      </div>
      <div className={styles.riverCards} data-node-id="9:174">
        <article className={styles.riverCard} data-node-id="9:176">
          <div className={styles.riverCardImage} data-node-id="9:177">
            <img className={styles.riverCardPhotoOne} src={imgRiverCardOneFrame} alt="남한강 자전거 코스" />
          </div>
          <h3 className={styles.riverCardTitle} data-node-id="9:179">
            남한강에서 편안하게
            <br />
            달릴 수 있는 자전거 코스
          </h3>
        </article>
        <article className={`${styles.riverCard} ${styles.riverCardNarrow}`} data-node-id="9:180">
          <div className={styles.riverCardImage} data-node-id="9:181">
            <img className={styles.riverCardPhotoTwo} src={imgRiverCardTwoFrame} alt="세종대왕 관련 문화유산" />
          </div>
          <h3 className={styles.riverCardTitle} data-node-id="9:183">
            한글의 자음을 따라 달리는
            <br />
            지붕 없는 박물관
          </h3>
        </article>
      </div>
    </section>
  );
}

function SpecialSection() {
  return (
    <section className={styles.specialSection} aria-labelledby="special-title" data-node-id="7:106">
      <h2 id="special-title" className={styles.specialTitle} data-node-id="7:107">
        따르릉 투어의 특별함 세가지
      </h2>
      <div className={styles.specialList} data-node-id="7:157">
        <FeatureRow
          imageClassName={styles.featurePhotoOne}
          imageSrc={imgFeatureOneFrame}
          imageAlt="PAS 전기 자전거"
          title={
            <>
              힘들이지 않고 가뿐하게, <br />
              PAS 전기 자전거
            </>
          }
          body={
            <>
              페달을 밟으면 모터가 힘을 더해주는 PAS 전용 전기 자건거를 이용합니다.
              <br />
              가파른 오르막이나 체력 부담 걱정 없이, 남한강 자전거길의 평지 코스를
              <br />
              누구나 여유롭고 안전하게 완주할 수 있습니다. 
            </>
          }
        />
        <FeatureRow
          reversed
          imageClassName={styles.featurePhotoTwo}
          imageSrc={imgFeatureTwoFrame}
          imageAlt="가이드 크루와 함께하는 주행"
          title={
            <>
              안전과 감동을 책임지는
              <br />
              가이드 크루
            </>
          }
          body={
            <>
              전문 가이드가 대열의 선두와 후미에서 밀착 동행 합니다.
              <br />
              안전 관리부터 명소 해설까지 투어의 처음과 끝을 든든하게 지켜드립니다. 
            </>
          }
        />
        <FeatureRow
          imageClassName={styles.featurePhotoThree}
          imageSrc={imgFeatureThreeFrame}
          imageAlt="세나 인터콤 헬멧"
          title={
            <>
              달리는 라디오,
              <br />
              세나인터콤
            </>
          }
            body="특수 헬멧에 장착된 인터콤 시스템을 활용하여, 주행 중에도 가이드의 실시간 길 안내와 흥미진진한 여주 역사 이야기를 라디오 방송처럼 생생하게 들으며 즐길 수 있습니다. "
        />
      </div>
      <Decorations />
    </section>
  );
}

type FeatureRowProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  title: ReactNode;
  body: ReactNode;
  reversed?: boolean;
};

function FeatureRow({ imageSrc, imageAlt, imageClassName, title, body, reversed }: FeatureRowProps) {
  const image = (
    <div className={styles.featureImageFrame}>
      <img className={imageClassName} src={imageSrc} alt={imageAlt} />
    </div>
  );
  const copy = (
    <div className={`${styles.featureCopy} ${reversed ? styles.featureCopyRight : ""}`}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );

  return (
    <article className={styles.featureRow}>
      {reversed ? copy : image}
      {reversed ? image : copy}
    </article>
  );
}

function JourneySection() {
  return (
    <section className={styles.journeySection} aria-labelledby="journey-title" data-node-id="21:366">
      <h2 id="journey-title" className={styles.journeyTitle} data-node-id="19:101">
        이야기를 따라 달리는 4가지 여정
      </h2>
      <div className={styles.journeyGrid} data-node-id="21:364">
        {journeyCards.map((journey) => (
          <a
            className={styles.journeyCard}
            href={journey.href}
            key={journey.title}
            aria-label={`${journey.title} 코스 안내 보기`}
            onClick={(event) => handleJourneyCardClick(event, journey.href)}
          >
            <img className={styles.journeyMediaImage} src={journey.img} alt="" />
            <h3>{journey.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className={styles.contactCta} aria-labelledby="contact-title" data-node-id="1:81" data-name="CTA">
      <div className={styles.contactBg} data-node-id="1:82" />
      <div className={styles.contactCopy} data-node-id="23:485" data-name="Content">
        <h2 id="contact-title" data-node-id="23:486">
          궁금한 점이 있으신가요?
        </h2>
        <p data-node-id="23:487">
          코스 문의, 단체 예약, 자전거 이용 방법 등 따르릉 여주 시티투어에 대한 모든 궁금증을 환영합니다. 
          <br />
          카카오톡 채널로 메시지를 남겨주시면 친절하게 안내해 드리겠습니다.
          <br />
          주말 / 공휴일에는 가이드들이 현장에서 신나게 투어를 진행하고 있어 실시간 응대가 어려울 수  있습니다.  
          <br />
          <br />
          상담 운영 시간 -  평일 9:00~18:00
        </p>
      </div>
      <a className={styles.kakaoButton} href={kakaoChannelUrl} data-node-id="1:84" data-name="Button">
        <span className={styles.kakaoIcon}>
          <img src={imgImage40} alt="" />
        </span>
        <span>카카오톡으로 문의하기</span>
      </a>
    </section>
  );
}

function MobileLanding() {
  return (
    <div className={styles.mobileFrame} data-node-id="57:134" data-name="01_landing_M">
      <MobileSiteHeader active="landing" />
      <section className={styles.mobileHero} aria-labelledby="mobile-landing-title">
        <div className={styles.mobileCopyBlock}>
          <h1 id="mobile-landing-title" className={styles.mobileHeroTitle}>
            가이드와 함께
            <br />
            전기 자전거로 달리는
            <br />
            가장 완벽한 여주 시티투어
          </h1>
          <p className={styles.mobileBodyText}>
            전기 자전거에 몸을 싣고 여주의 풍경 속으로 들어와 보세요. 발길이 닿지 않던 샛길부터 탁 트인 남한강변까지, 바퀴가 구르는 곳마다 흥미로운 이야기가 펼쳐집니다. 여주의 구석구석을 가장 잘 아는 든든한 '자전거 가이드'가 여러분의 안전하고 즐거운 여행을 책임집니다. 우리 가족, 친구, 연인과 여주에서 잊지 못할 낭만을 완성해 보세요.
          </p>
        </div>
        <div className={styles.mobileHeroArt} aria-hidden="true">
          <div className={styles.mobileHeroYellowOutline} />
          <div className={styles.mobileHeroYellowFill} />
          <img className={styles.mobileHeroBikeImage} src={imgHeroBikeSource} alt="" />
        </div>
      </section>
      <section className={styles.mobileRiver} aria-labelledby="mobile-river-title">
        <div className={styles.mobileCopyBlock}>
          <h2 id="mobile-river-title" className={styles.mobileSectionTitle}>
            두 바퀴로 만나는
            <br />
            남한강의 선물
            <br />
            그리고 세종대왕
          </h2>
          <p className={styles.mobileBodyText}>
            "자전거를 타기 위해 만들어진 도시가 아닐까?" 여주 남한강변을 한 번이라도 달려본 분들이라면 모두 고개를 끄덕이실 겁니다. 여주는 탁 트인 자연과 깊은 역사가 평탄한 길 위에 나란히 놓여 있어, 자전거 여행에 최적화된 완벽한 무대입니다.
          </p>
        </div>
        <div className={`${styles.mobilePhotoFrame} ${styles.mobileRiverHeroPhoto}`}>
          <img src={imgKakaoTalk20250905103329489281} alt="남한강변 자전거길" />
        </div>
        <div className={styles.mobileRiverCards}>
          <article className={styles.mobileRiverCard}>
            <div className={`${styles.mobilePhotoFrame} ${styles.mobileRiverCardPhotoOne}`}>
              <img src={img001P1} alt="남한강 자전거 코스" />
            </div>
            <h3>남한강에서 편안하게 달릴 수 있는 자전거 코스</h3>
          </article>
          <article className={styles.mobileRiverCard}>
            <div className={`${styles.mobilePhotoFrame} ${styles.mobileRiverCardPhotoTwo}`}>
              <img src={imgF5550E6E0A054A92B6DbAae059C455821} alt="세종대왕 관련 문화유산" />
            </div>
            <h3>한글의 자음을 따라 달리는 지붕 없는 박물관</h3>
          </article>
        </div>
      </section>
      <section className={styles.mobileSpecial} aria-labelledby="mobile-special-title">
        <h2 id="mobile-special-title" className={styles.mobileSectionTitle}>
          따르릉 투어의 특별함 세가지
        </h2>
        <div className={styles.mobileFeatureList}>
          <MobileFeature
            imageSrc={imgKakaoTalk202511171151172981}
            imageAlt="PAS 전기 자전거"
            imageClassName={styles.mobileFeaturePhotoOne}
            title={
              <>
                힘들이지 않고 가뿐하게,
                <br />
                PAS 전기 자전거
              </>
            }
            body="페달을 밟으면 모터가 힘을 더해주는 PAS 전용 전기 자전거를 이용합니다. 가파른 오르막이나 체력 부담 걱정 없이, 남한강 자전거길의 평지 코스를 누구나 여유롭고 안전하게 완주할 수 있습니다."
          />
          <MobileFeature
            imageSrc={imgKakaoTalk202511171152391871}
            imageAlt="가이드 크루와 함께하는 주행"
            imageClassName={styles.mobileFeaturePhotoTwo}
            title={
              <>
                안전과 감동을 책임지는
                <br />
                가이드 크루
              </>
            }
            body="전문 가이드가 대열의 선두와 후미에서 밀착 동행 합니다. 안전 관리부터 명소 해설까지 투어의 처음과 끝을 든든하게 지켜드립니다."
            alignRight
          />
          <MobileFeature
            imageSrc={imgKakaoTalk20251117115117298071}
            imageAlt="세나 인터콤 헬멧"
            imageClassName={styles.mobileFeaturePhotoThree}
            title={
              <>
                달리는 라디오,
                <br />
                세나인터콤
              </>
            }
            body="특수 헬멧에 장착된 인터콤 시스템을 활용하여, 주행 중에도 가이드의 실시간 길 안내와 흥미진진한 여주 역사 이야기를 라디오 방송처럼 생생하게 들으며 즐길 수 있습니다."
          />
        </div>
      </section>
      <section className={styles.mobileJourney} aria-labelledby="mobile-journey-title">
        <h2 id="mobile-journey-title" className={`${styles.mobileCenteredTitle} ${styles.mobileSectionTitle}`}>
          이야기를 따라 달리는 4가지 여정
        </h2>
        <MobileTourCardGrid mode="courses" />
      </section>
      <section className={styles.mobileContact} aria-labelledby="mobile-contact-title">
        <div className={styles.mobileCopyBlock}>
          <h2 id="mobile-contact-title" className={styles.mobileSectionTitle}>
            궁금한 점이
            <br />
            있으신가요?
          </h2>
          <p className={styles.mobileBodyText}>
            코스 문의, 단체 예약, 자전거 이용 방법 등 따르릉 여주 시티투어에 대한 모든 궁금증을 환영합니다. 카카오톡 채널로 메시지를 남겨주시면 친절하게 안내해 드리겠습니다. 주말 / 공휴일에는 가이드들이 현장에서 신나게 투어를 진행하고 있어 실시간 응대가 어려울 수 있습니다. 상담 운영 시간 - 평일 9:00~18:00
          </p>
        </div>
        <a className={styles.mobileKakaoButton} href={kakaoChannelUrl}>
          <span className={styles.mobileKakaoIcon}>
            <img src={imgImage40} alt="" />
          </span>
          <span>카카오톡으로 문의하기</span>
        </a>
      </section>
      <MobileDecorations />
    </div>
  );
}

type MobileFeatureProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  title: ReactNode;
  body: string;
  alignRight?: boolean;
};

function MobileFeature({ imageSrc, imageAlt, imageClassName, title, body, alignRight }: MobileFeatureProps) {
  return (
    <article className={styles.mobileFeature}>
      <div className={styles.mobileFeatureImage}>
        <img className={imageClassName} src={imageSrc} alt={imageAlt} />
      </div>
      <div className={`${styles.mobileFeatureCopy} ${alignRight ? styles.mobileFeatureCopyRight : ""}`}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

function MobileDecorations() {
  return (
    <div className={styles.mobileDecorations} aria-hidden="true">
      <YellowSpark />
      <img className={styles.mobileBlueSquiggle} src={imgVector36} alt="" />
      <img className={styles.mobileBlueMark} src={imgVector21} alt="" />
      <img className={styles.mobileSmile} src={imgSmile} alt="" />
      <img className={styles.mobileRedSquiggle} src={imgVector20} alt="" />
      <img className={styles.mobileRedDashOne} src={imgMobileRedDashOne} alt="" />
      <img className={styles.mobileRedDashTwo} src={imgMobileRedDashTwo} alt="" />
    </div>
  );
}

function YellowSpark() {
  return (
    <img className={styles.yellowSpark} src={imgYellowSpark} alt="" aria-hidden="true" data-node-id="10:173" />
  );
}

function Decorations() {
  return (
    <div className={styles.specialDecorations} aria-hidden="true">
      <img className={styles.blueSquiggle} src={imgVector36} alt="" data-node-id="10:170" />
      <img className={styles.blueMark} src={imgVector21} alt="" data-node-id="24:154" />
      <img className={styles.smile} src={imgSmile} alt="" data-node-id="24:149" data-name="스마일" />
      <img className={styles.redSquiggle} src={imgVector20} alt="" data-node-id="10:119" />
      <img className={styles.redDashOne} src={imgRedDashOne} alt="" data-node-id="37:785" />
      <img className={styles.redDashTwo} src={imgRedDashTwo} alt="" data-node-id="37:786" />
    </div>
  );
}
