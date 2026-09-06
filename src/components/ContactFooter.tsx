import { kakaoChannelUrl } from "@/lib/tourLinks";
import { withBasePath } from "@/lib/sitePaths";
import styles from "./ContactFooter.module.css";

const kakaoIcon = withBasePath("/assets/figma/mcp/efb2b323-a460-4830-a947-ad0427775610.png");
const yeojuLogo = withBasePath("/assets/figma/260906/footer-yeoju.svg");
const foundationLogo = withBasePath("/assets/figma/260906/footer-partners.png");

export default function ContactFooter() {
  return (
    <footer className={styles.footer} data-contact-footer>
      <div className={styles.inner}>
        <div className={styles.contactRow}>
          <div className={styles.copy} data-visual-id="footer-copy">
            <h2 data-visual-id="footer-title">
              궁금한 점이<span className={styles.mobileBreak}><br /></span> 있으신가요?
            </h2>
            <div className={styles.bodyCopy} data-visual-id="footer-body">
              <p>코스 문의, 단체 예약, 자전거 이용 방법 등 따르릉 여주 시티투어에 대한 모든 궁금증을 환영합니다.</p>
              <p>카카오톡 채널로 메시지를 남겨주시면 친절하게 안내해 드리겠습니다.</p>
              <p>주말 / 공휴일에는 가이드들이 현장에서 투어를 진행하고 있어 실시간 응대가 어려울 수 있습니다.</p>
              <p className={styles.blankLine} aria-hidden="true">&nbsp;</p>
              <p className={styles.hours}>상담 운영 시간 - 평일 9:00~18:00</p>
            </div>
          </div>
          <a className={styles.kakaoButton} href={kakaoChannelUrl} target="_blank" rel="noreferrer" data-visual-id="footer-kakao-link">
            <span className={styles.kakaoVisual} data-kakao-visual>
              <img src={kakaoIcon} alt="" width={225} height={225} aria-hidden="true" />
              <span>따르릉 여주 한글길</span>
            </span>
          </a>
        </div>

        <div className={styles.logoRow} aria-label="운영 기관" data-visual-id="footer-logos">
          <img className={styles.yeojuLogo} src={yeojuLogo} alt="여주시" width={117} height={43} />
          <img className={styles.foundationLogo} src={foundationLogo} alt="여주세종문화관광재단" width={256} height={42} />
        </div>
      </div>
    </footer>
  );
}
