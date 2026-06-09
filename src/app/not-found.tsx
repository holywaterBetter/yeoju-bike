import { withBasePath } from "@/lib/sitePaths";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", padding: "48px 24px", fontFamily: "var(--font-primary)" }}>
      <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.2 }}>페이지를 찾을 수 없습니다</h1>
      <p style={{ margin: "16px 0 24px", fontSize: 16, lineHeight: 1.6 }}>
        요청하신 페이지가 이동되었거나 존재하지 않습니다.
      </p>
      <a href={withBasePath("/")}>홈으로 돌아가기</a>
    </main>
  );
}
