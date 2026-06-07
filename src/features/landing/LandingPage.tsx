import type { ReactNode } from "react";
import styles from "./LandingPage.module.css";

const imgImage30 = "/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png";
const imgKakaoTalk20250905103329489281 = "/assets/figma/mcp/6953c77a-4366-4c08-95a5-b18a1e6a7cee.jpg";
const img001P1 = "/assets/figma/mcp/8d01a7f6-43e6-4989-be27-7bff9861bf36.jpg";
const imgF5550E6E0A054A92B6DbAae059C455821 = "/assets/figma/mcp/7126efd5-5893-4db5-a348-932564b7fd20.jpg";
const imgKakaoTalk202511171151172981 = "/assets/figma/mcp/461689e3-dc4a-47ac-8fc9-7f9928a9fed4.jpg";
const imgKakaoTalk202511171152391871 = "/assets/figma/mcp/c57dbe85-295b-4130-9b84-401993be52c4.jpg";
const imgKakaoTalk20251117115117298071 = "/assets/figma/mcp/da8bc77c-6a74-4345-98b6-f0941f96579e.jpg";
const imgHeroArt = "/assets/figma/crops/landing-hero-art.png";
const imgHeroArtMobile = "/assets/figma/crops/landing-hero-art-mobile.png";
const img21 = "/assets/figma/mcp/72885cc4-ed18-4afb-b62b-331a13bdcd30.jpg";
const img001P2 = "/assets/figma/crops/landing-journey-2.png";
const img321 = "/assets/figma/mcp/6463445a-2b7e-4012-a734-ef5f4c61265a.jpg";
const imgKakaoTalk202512101008513031221 = "/assets/figma/mcp/506cf519-70a9-4392-802b-96ae31af2f6e.jpg";
const imgImage40 = "/assets/figma/mcp/efb2b323-a460-4830-a947-ad0427775610.png";
const imgVector36 = "/assets/figma/mcp/17b7eb28-4867-4d74-a8bd-e6899da0f967.svg";
const imgVector21 = "/assets/figma/mcp/7424fa6c-9d52-426c-acf0-36708e7cc0ff.svg";
const imgVector22 = "/assets/figma/mcp/e4d437c1-8d13-4eed-b3b8-261456c5848b.svg";
const imgVector23 = "/assets/figma/mcp/a7cc0556-21cd-47e2-86f7-3b12fc67b491.svg";
const imgVector24 = "/assets/figma/mcp/8478e406-1a1b-48ff-bba1-b941fe80d055.svg";
const imgVector20 = "/assets/figma/mcp/1fb74ddd-3cfd-4e66-a342-349511268172.svg";
const imgVector113 = "/assets/figma/mcp/74dd63a5-99e2-4abe-bc00-67d6d428faa3.svg";
const imgVector114 = "/assets/figma/mcp/ef83f09a-2df0-4951-a579-9ff037607938.svg";
const imgVector25 = "/assets/figma/mcp/7d2cf0bf-b3fb-43b2-bc61-1b1045e20f0b.svg";
const imgVector26 = "/assets/figma/mcp/b3c465b3-8d47-47a5-ac93-e7ef97aac84d.svg";
const imgVector27 = "/assets/figma/mcp/27134f66-7a03-4a75-aec4-7c8abd05bddf.svg";
const imgVector28 = "/assets/figma/mcp/b2ae60b3-db5f-431a-8e64-bef9ba186ae9.svg";
const referenceImage = "/assets/figma/reference/01-landing.png";

type LandingPageProps = {
  className?: string;
};

export default function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={styles.surface} data-responsive-page="landing">
      <main className={[styles.page, className].filter(Boolean).join(" ")} data-node-id="1:52" data-name="01_Landing">
        <img className={styles.referenceLayer} src={referenceImage} alt="" aria-hidden="true" />
        <BackgroundGlow />
        <Header />
        <Hero />
        <RiverSection />
        <SpecialSection />
        <JourneySection />
        <ContactCta />
      </main>
    </div>
  );
}

function Header() {
  return (
    <>
      <a className={styles.logoWrap} href="/" aria-label="따르릉 여주 홈" data-node-id="7:101" data-name="image 30">
        <img className={styles.fullImage} src={imgImage30} alt="따르릉 여주 로고" />
      </a>
      <nav className={styles.nav} aria-label="주요 메뉴" data-node-id="35:956">
        <a className={styles.navActive} href="/" aria-current="page">투어 소개</a>
        <a href="/courses">코스 안내</a>
        <a href="/reservation">투어 예약</a>
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
        <picture>
          <source media="(max-width: 767px)" srcSet={imgHeroArtMobile} />
          <img className={styles.heroArtImage} src={imgHeroArt} alt="" />
        </picture>
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
        <img className={styles.riverHeroPhoto} src={imgKakaoTalk20250905103329489281} alt="남한강변 자전거길" />
      </div>
      <div className={styles.riverCards} data-node-id="9:174">
        <article className={styles.riverCard} data-node-id="9:176">
          <div className={styles.riverCardImage} data-node-id="9:177">
            <img className={styles.riverCardPhotoOne} src={img001P1} alt="남한강 자전거 코스" />
          </div>
          <h3 className={styles.riverCardTitle} data-node-id="9:179">
            남한강에서 편안하게
            <br />
            달릴 수 있는 자전거 코스
          </h3>
        </article>
        <article className={`${styles.riverCard} ${styles.riverCardNarrow}`} data-node-id="9:180">
          <div className={styles.riverCardImage} data-node-id="9:181">
            <img className={styles.riverCardPhotoTwo} src={imgF5550E6E0A054A92B6DbAae059C455821} alt="세종대왕 관련 문화유산" />
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
          imageSrc={imgKakaoTalk202511171151172981}
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
          imageSrc={imgKakaoTalk202511171152391871}
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
          imageSrc={imgKakaoTalk20251117115117298071}
          imageAlt="세나 인터콤 헬멧"
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
  const journeys = [
    {
      title: "따르릉 여주 한글길 투어",
      img: img21,
      imageClass: styles.journeyPhotoOne,
      gradient: styles.journeyGradientOne,
    },
    {
      title: "남한강 골든벨 투어",
      img: img001P2,
      imageClass: styles.journeyBakedImage,
      gradient: styles.journeyGradientTwo,
      baked: true,
    },
    {
      title: "K-여주 바이크 투어",
      img: img321,
      imageClass: styles.journeyPhotoThree,
      gradient: styles.journeyGradientThree,
    },
    {
      title: "따르릉 동호회 코스",
      img: imgKakaoTalk202512101008513031221,
      imageClass: styles.journeyPhotoFour,
      gradient: styles.journeyGradientFour,
    },
  ];

  return (
    <section className={styles.journeySection} aria-labelledby="journey-title" data-node-id="21:366">
      <h2 id="journey-title" className={styles.journeyTitle} data-node-id="19:101">
        이야기를 따라 달리는 4가지 여정
      </h2>
      <div className={styles.journeyGrid} data-node-id="21:364">
        {journeys.map((journey) => (
          <article className={styles.journeyCard} key={journey.title}>
            <img className={journey.imageClass} src={journey.img} alt="" />
            {journey.baked ? null : (
              <>
                <div className={styles.journeyBlur} />
                <div className={`${styles.journeyGradient} ${journey.gradient}`} />
              </>
            )}
            <h3 className={journey.baked ? styles.visualHidden : undefined}>{journey.title}</h3>
          </article>
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
          주말 / 공휴일에는 가이드들이 현장에서 신나게 투어를 진행하고 있어 실시간 응대가 어려울 수 있습니다.
          <br />
          <br />
          상담 운영 시간 - 평일 9:00~18:00
        </p>
      </div>
      <a className={styles.kakaoButton} href="#" data-node-id="1:84" data-name="Button">
        <span className={styles.kakaoIcon}>
          <img src={imgImage40} alt="" />
        </span>
        <span>카카오톡으로 문의하기</span>
      </a>
    </section>
  );
}

function BackgroundGlow() {
  return (
    <div className={styles.bg} aria-hidden="true" data-node-id="37:770" data-name="BG">
      <div className={`${styles.glow} ${styles.glowOne}`} />
      <div className={`${styles.glow} ${styles.glowTwo}`} />
      <div className={`${styles.glow} ${styles.glowThree}`} />
      <div className={`${styles.glow} ${styles.glowFour}`} />
      <div className={`${styles.glow} ${styles.glowFive}`} />
      <div className={`${styles.glow} ${styles.glowSix}`} />
    </div>
  );
}

function YellowSpark() {
  return (
    <div className={styles.yellowSpark} aria-hidden="true" data-node-id="10:173">
      <img className={styles.sparkOne} src={imgVector25} alt="" />
      <img className={styles.sparkTwo} src={imgVector26} alt="" />
      <img className={styles.sparkThree} src={imgVector27} alt="" />
      <img className={styles.sparkFour} src={imgVector28} alt="" />
    </div>
  );
}

function Decorations() {
  return (
    <div aria-hidden="true">
      <img className={styles.blueSquiggle} src={imgVector36} alt="" data-node-id="10:170" />
      <img className={styles.blueMark} src={imgVector21} alt="" data-node-id="24:154" />
      <div className={styles.smile} data-node-id="24:149" data-name="스마일">
        <img className={styles.smileEyeOne} src={imgVector22} alt="" />
        <img className={styles.smileEyeTwo} src={imgVector23} alt="" />
        <img className={styles.smileMouth} src={imgVector24} alt="" />
      </div>
      <img className={styles.redSquiggle} src={imgVector20} alt="" data-node-id="10:119" />
      <img className={styles.redDashOne} src={imgVector113} alt="" data-node-id="37:785" />
      <img className={styles.redDashTwo} src={imgVector114} alt="" data-node-id="37:786" />
    </div>
  );
}
