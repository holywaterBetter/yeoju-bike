import { type ReactNode } from "react";
import MobileSiteHeader from "@/components/MobileSiteHeader";
import MobileTourCardGrid from "@/components/MobileTourCardGrid";
import RevealOnScroll from "@/components/RevealOnScroll";
import { eagerImageAttrs, lazyImageAttrs } from "@/lib/imageAttrs";
import { withBasePath } from "@/lib/sitePaths";
import { kakaoChannelUrl } from "@/lib/tourLinks";
import { tourCatalog } from "@/lib/tours";
import styles from "./LandingPage.module.css";

const imgImage30 = withBasePath("/assets/figma/mcp/6e173378-eb7c-4df3-936b-d8007b404ad4.png");
const imgKakaoTalk20250905103329489281 = withBasePath("/assets/figma/mcp/6953c77a-4366-4c08-95a5-b18a1e6a7cee-mobile.webp");
const img001P1 = withBasePath("/assets/figma/mobile/tour-card-golden-river-mobile.webp");
const imgF5550E6E0A054A92B6DbAae059C455821 = withBasePath("/assets/figma/mcp/7126efd5-5893-4db5-a348-932564b7fd20-mobile.webp");
const imgKakaoTalk202511171151172981 = withBasePath("/assets/figma/mcp/461689e3-dc4a-47ac-8fc9-7f9928a9fed4-mobile.webp");
const imgKakaoTalk202511171152391871 = withBasePath("/assets/figma/mcp/c57dbe85-295b-4130-9b84-401993be52c4-mobile.webp");
const imgKakaoTalk20251117115117298071 = withBasePath("/assets/figma/mcp/da8bc77c-6a74-4345-98b6-f0941f96579e-mobile.webp");
const imgImage40 = withBasePath("/assets/figma/mcp/efb2b323-a460-4830-a947-ad0427775610.png");
const imgRiverHeroFrame = withBasePath("/assets/figma/groups/landing-river-hero-frame.webp");
const imgRiverCardOneFrame = withBasePath("/assets/figma/groups/landing-river-card-one-frame.webp");
const imgRiverCardTwoFrame = withBasePath("/assets/figma/groups/landing-river-card-two-frame.webp");
const imgFeatureOneFrame = withBasePath("/assets/figma/groups/landing-feature-one-frame.webp");
const imgFeatureTwoFrame = withBasePath("/assets/figma/groups/landing-feature-two-frame.webp");
const imgFeatureThreeFrame = withBasePath("/assets/figma/groups/landing-feature-three-frame.webp");
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

const journeyCards = tourCatalog;

export default function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={styles.surface} data-responsive-page="landing">
      <RevealOnScroll />
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
        <img className={styles.fullImage} src={imgImage30} alt="따르릉 여주 로고" width={146} height={101} {...eagerImageAttrs} />
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
          가이드와 함께 전기 자전거로 달리는
          <br />
          가장 완벽한 여주 시티투어
        </h1>
        <p className={styles.heroDescription} data-node-id="1:59">
          전기 자전거에 몸을 싣고 여주의 풍경 속으로 들어와 보세요. 발길이 닿지 않던 샛길부터 탁 트인 남한강변까지,
          <br />
          바퀴가 구르는 곳마다 흥미로운 이야기가 펼쳐집니다.
          <br />
          여주의 구석구석을 가장 잘 아는 든든한 '자전거 가이드'가 여러분의 안전하고 즐거운 여행을 책임집니다.
          <br />
          우리 가족, 친구, 연인과 여주에서 잊지 못할 낭만을 완성해 보세요.
        </p>
      </div>
    </section>
  );
}

function RiverSection() {
  return (
    <section className={styles.riverSection} aria-labelledby="river-title" data-node-id="2:474" data-reveal>
      <div className={styles.riverIntro} data-node-id="1:78">
        <h2 id="river-title" className={styles.sectionTitle} data-node-id="1:80">
          두 바퀴로 만나는
          <img className={styles.riverTitleSpark} src={imgYellowSpark} alt="" width={172} height={109} aria-hidden="true" data-node-id="10:173" {...lazyImageAttrs} />
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
        <img className={styles.riverHeroPhoto} src={imgRiverHeroFrame} alt="남한강변 자전거길" width={1200} height={706} {...lazyImageAttrs} />
      </div>
      <div className={styles.riverCards} data-node-id="9:174">
        <article className={styles.riverCard} data-node-id="9:176">
          <div className={styles.riverCardImage} data-node-id="9:177">
            <img className={styles.riverCardPhotoOne} src={imgRiverCardOneFrame} alt="남한강 자전거 코스" width={600} height={350} {...lazyImageAttrs} />
          </div>
          <h3 className={styles.riverCardTitle} data-node-id="9:179">
            남한강에서 편안하게
            <br />
            달릴 수 있는 자전거 코스
          </h3>
        </article>
        <article className={`${styles.riverCard} ${styles.riverCardNarrow}`} data-node-id="9:180">
          <div className={styles.riverCardImage} data-node-id="9:181">
            <img className={styles.riverCardPhotoTwo} src={imgRiverCardTwoFrame} alt="세종대왕 관련 문화유산" width={560} height={350} {...lazyImageAttrs} />
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
    <section className={styles.specialSection} aria-labelledby="special-title" data-node-id="7:106" data-reveal>
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
              힘들이지 않고 가뿐하게,
              <img className={styles.featureSmileDecoration} src={imgSmile} alt="" width={76} height={76} data-node-id="24:149" data-name="스마일" {...lazyImageAttrs} />
              <br />
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
              <img className={styles.featureGuideMarkDecoration} src={imgVector21} alt="" width={71} height={88} data-node-id="24:154" {...lazyImageAttrs} />
              안전과 감동을 책임지는
              <br />
              가이드 크루
              <img className={styles.featureGuideUnderlineDecoration} src={imgVector36} alt="" width={216} height={40} data-node-id="10:170" {...lazyImageAttrs} />
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
              <img className={styles.featureSenaSquiggleDecoration} src={imgVector20} alt="" width={123} height={40} data-node-id="10:119" {...lazyImageAttrs} />
              <span className={styles.featureRadioDashOne} data-node-id="37:785">
                <span className={styles.redDashOneInner}>
                  <img src={imgRedDashOne} alt="" width={22} height={38} {...lazyImageAttrs} />
                </span>
              </span>
              <span className={styles.featureRadioDashTwo} data-node-id="37:786">
                <span className={styles.redDashTwoInner}>
                  <img src={imgRedDashTwo} alt="" width={41} height={19} {...lazyImageAttrs} />
                </span>
              </span>
              <br />
              세나인터콤
            </>
          }
            body="특수 헬멧에 장착된 인터콤 시스템을 활용하여, 주행 중에도 가이드의 실시간 길 안내와 흥미진진한 여주 역사 이야기를 라디오 방송처럼 생생하게 들으며 즐길 수 있습니다. "
        />
      </div>
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
      <img className={imageClassName} src={imageSrc} alt={imageAlt} width={540} height={350} {...lazyImageAttrs} />
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
    <section className={styles.journeySection} aria-labelledby="journey-title" data-node-id="21:366" data-reveal>
      <h2 id="journey-title" className={styles.journeyTitle} data-node-id="19:101">
        이야기를 따라 달리는 4가지 여정
      </h2>
      <div className={styles.journeyGrid} data-node-id="21:364">
        {journeyCards.map((journey) => (
          <a
            className={styles.journeyCard}
            href={journey.courseHref}
            key={journey.anchor}
            aria-label={`${journey.plainTitle} 상세 안내 보기`}
          >
            <img className={styles.journeyMediaImage} src={journey.desktopCardMedia} alt="" width={585} height={286} {...lazyImageAttrs} />
            <h3>
              {journey.titleLines.map((line, index) => (
                <span className={index > 0 ? styles.journeyTitleSecondary : undefined} key={line}>
                  {line}
                </span>
              ))}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className={styles.contactCta} aria-labelledby="contact-title" data-node-id="1:81" data-name="CTA" data-reveal>
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
          <img src={imgImage40} alt="" width={225} height={225} {...lazyImageAttrs} />
        </span>
        <span>카카오톡으로 문의하기</span>
      </a>
    </section>
  );
}

function MobileLanding() {
  return (
    <div className={styles.mobileFrame} data-node-id="57:134" data-name="01_landing_M">
      <MobileSiteHeader active="landing" compact />
      <section className={styles.mobileHero} aria-labelledby="mobile-landing-title">
        <div className={`${styles.mobileCopyBlock} ${styles.mobileHeroCopyBlock}`}>
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
      </section>
      <section className={styles.mobileRiver} aria-labelledby="mobile-river-title" data-reveal>
        <div className={styles.mobileCopyBlock}>
          <h2 id="mobile-river-title" className={styles.mobileSectionTitle}>
            두 바퀴로 <span className={styles.mobileRiverTitleAnchor}><span className={styles.mobileRiverTitleText}>만나는</span><img className={styles.mobileRiverSpark} src={imgYellowSpark} alt="" width={172} height={109} {...lazyImageAttrs} /></span>
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
          <img src={imgKakaoTalk20250905103329489281} alt="남한강변 자전거길" width={1320} height={991} {...lazyImageAttrs} />
        </div>
        <div className={styles.mobileRiverCards}>
          <article className={styles.mobileRiverCard}>
            <div className={`${styles.mobilePhotoFrame} ${styles.mobileRiverCardPhotoOne}`}>
              <img src={img001P1} alt="남한강 자전거 코스" width={1000} height={565} {...lazyImageAttrs} />
            </div>
            <h3>남한강에서 편안하게 달릴 수 있는 자전거 코스</h3>
          </article>
          <article className={styles.mobileRiverCard}>
            <div className={`${styles.mobilePhotoFrame} ${styles.mobileRiverCardPhotoTwo}`}>
              <img src={imgF5550E6E0A054A92B6DbAae059C455821} alt="세종대왕 관련 문화유산" width={900} height={675} {...lazyImageAttrs} />
            </div>
            <h3>한글의 자음을 따라 달리는 지붕 없는 박물관</h3>
          </article>
        </div>
      </section>
      <section className={styles.mobileSpecial} aria-labelledby="mobile-special-title" data-reveal>
        <h2 id="mobile-special-title" className={styles.mobileSectionTitle}>
          따르릉 투어의 특별함 세가지
        </h2>
        <div className={styles.mobileFeatureList}>
          <MobileFeature
            imageSrc={imgKakaoTalk202511171151172981}
            imageAlt="PAS 전기 자전거"
            imageClassName={styles.mobileFeaturePhotoOne}
            imageWidth={1200}
            imageHeight={800}
            title={
              <>
                힘들이지 않고 가뿐하<span className={styles.mobileSmileAnchor}><span className={styles.mobileSmileText}>게,</span><img className={styles.mobileSmileDecoration} src={imgSmile} alt="" width={76} height={76} {...lazyImageAttrs} /></span>
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
            imageWidth={900}
            imageHeight={675}
            title={
              <>
                <span className={styles.mobileGuideFirstLine}><img className={styles.mobileGuideStar} src={imgVector21} alt="" width={71} height={88} {...lazyImageAttrs} /><span className={styles.mobileGuideText}>안전과 감동을 책임지는</span></span>
                <br />
                <span className={styles.mobileGuideCrewLine}><span className={styles.mobileGuideText}>가이드 크루</span><img className={styles.mobileGuideUnderline} src={imgVector36} alt="" width={216} height={40} {...lazyImageAttrs} /></span>
              </>
            }
            body="전문 가이드가 대열의 선두와 후미에서 밀착 동행 합니다. 안전 관리부터 명소 해설까지 투어의 처음과 끝을 든든하게 지켜드립니다."
            alignRight
          />
          <MobileFeature
            imageSrc={imgKakaoTalk20251117115117298071}
            imageAlt="세나 인터콤 헬멧"
            imageClassName={styles.mobileFeaturePhotoThree}
            imageWidth={720}
            imageHeight={1079}
            imageDecoration={<img className={styles.mobileSenaSquiggle} src={imgVector20} alt="" width={123} height={40} {...lazyImageAttrs} />}
            title={
              <>
                달리는{" "}
                <span className={styles.mobileRadioAnchor}>
                  라디오,
                  <span className={styles.mobileRadioDashOne} data-node-id="57:430">
                    <span className={styles.mobileRadioDashOneInner}>
                      <img src={imgMobileRedDashOne} alt="" width={13} height={22} {...lazyImageAttrs} />
                    </span>
                  </span>
                  <span className={styles.mobileRadioDashTwo} data-node-id="57:431">
                    <span className={styles.mobileRadioDashTwoInner}>
                      <img src={imgMobileRedDashTwo} alt="" width={24} height={11} {...lazyImageAttrs} />
                    </span>
                  </span>
                </span>
                <br />
                세나인터콤
              </>
            }
            body="특수 헬멧에 장착된 인터콤 시스템을 활용하여, 주행 중에도 가이드의 실시간 길 안내와 흥미진진한 여주 역사 이야기를 라디오 방송처럼 생생하게 들으며 즐길 수 있습니다."
          />
        </div>
      </section>
      <section className={styles.mobileJourney} aria-labelledby="mobile-journey-title" data-reveal>
        <h2 id="mobile-journey-title" className={`${styles.mobileCenteredTitle} ${styles.mobileSectionTitle}`}>
          이야기를 따라 달리는 4가지 여정
        </h2>
        <MobileTourCardGrid mode="courses" />
      </section>
      <section className={styles.mobileContact} aria-labelledby="mobile-contact-title" data-reveal>
        <div className={styles.mobileCopyBlock}>
          <h2 id="mobile-contact-title" className={styles.mobileSectionTitle}>
            궁금한 점이
            <br />
            있으신가요?
          </h2>
          <p className={styles.mobileBodyText}>
            코스 문의, 단체 예약, 자전거 이용 방법 등 따르릉 여주 시티투어에 대한
            <br />
            모든 궁금증을 환영합니다.
            <br />
            카카오톡 채널로 메시지를 남겨주시면 친절하게 안내해 드리겠습니다.
            <br />
            주말 / 공휴일에는 가이드들이 현장에서 신나게 투어를 진행하고 있어 실시간 응대가 어려울 수 있습니다.
            <br />
            <br />
            상담 운영 시간 - 평일 9:00~18:00
          </p>
        </div>
        <a className={styles.mobileKakaoButton} href={kakaoChannelUrl}>
          <span className={styles.mobileKakaoIcon}>
            <img src={imgImage40} alt="" width={225} height={225} {...lazyImageAttrs} />
          </span>
          <span>카카오톡으로 문의하기</span>
        </a>
      </section>
    </div>
  );
}

type MobileFeatureProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  imageWidth: number;
  imageHeight: number;
  title: ReactNode;
  body: string;
  alignRight?: boolean;
  imageDecoration?: ReactNode;
};

function MobileFeature({ imageSrc, imageAlt, imageClassName, imageWidth, imageHeight, title, body, alignRight, imageDecoration }: MobileFeatureProps) {
  return (
    <article className={styles.mobileFeature}>
      <div className={`${styles.mobileFeatureImage} ${alignRight ? styles.mobileFeatureImageRight : ""}`}>
        <div className={styles.mobileFeatureImageClip}>
          <img className={imageClassName} src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} {...lazyImageAttrs} />
        </div>
        {imageDecoration}
      </div>
      <div className={`${styles.mobileFeatureCopy} ${alignRight ? styles.mobileFeatureCopyRight : ""}`}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
