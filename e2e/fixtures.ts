import { test as base, expect, type Page } from "@playwright/test";

/**
 * 모든 페이지가 부팅 시 게스트 토큰을 발급받으려 하므로(GuestAuthBootstrap),
 * 실제 백엔드에 의존하지 않도록 기본으로 목킹해 둔 test를 export한다.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/api/v1/auth/guest", (route) =>
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "mock-access-token",
          refresh_token: "mock-refresh-token",
          token_type: "bearer",
        }),
      })
    );

    // Expo/React Native Web 개발 번들은 HTML이 페인트된 뒤에도 React 하이드레이션이
    // 끝나기까지 시간이 걸린다. 하이드레이션 전에 클릭/입력하면 이벤트 핸들러가 아직
    // 붙지 않아 아무 반응이 없거나(클릭) 다음 렌더에서 값이 초기화된다(입력).
    // 모든 goto 이후 짧게 대기해 이 문제를 근본적으로 막는다.
    const originalGoto = page.goto.bind(page);
    page.goto = (async (url: Parameters<typeof originalGoto>[0], options?: Parameters<typeof originalGoto>[1]) => {
      const response = await originalGoto(url, options);
      await page.waitForTimeout(1500);
      return response;
    }) as typeof page.goto;

    const originalReload = page.reload.bind(page);
    page.reload = (async (options?: Parameters<typeof originalReload>[0]) => {
      const response = await originalReload(options);
      await page.waitForTimeout(1500);
      return response;
    }) as typeof page.reload;

    await use(page);
  },
});

export { expect };

export async function mockChatResponse(page: Page, result = "테스트용 목 응답입니다.", delayMs = 0) {
  await page.route("**/api/v1/chat", async (route) => {
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
    await route.fulfill({ contentType: "application/json", body: JSON.stringify({ result }) });
  });
}

export async function mockChatFailure(page: Page, status = 500) {
  await page.route("**/api/v1/chat", (route) => route.fulfill({ status, body: "Internal Server Error" }));
}

export const SAMPLE_WORDS = [
  { id: 1, term: "TCP", definition: "**전송 제어 프로토콜**. 신뢰성 있는 연결 지향 통신을 보장합니다.", created_at: "2024-01-01" },
  { id: 2, term: "UDP", definition: "**비연결형 프로토콜**. 빠르지만 신뢰성은 낮습니다.", created_at: "2024-01-02" },
  { id: 3, term: "DNS", definition: "**도메인 네임 시스템**. 도메인을 IP 주소로 변환합니다.", created_at: "2024-01-03" },
];

export async function mockNetworkWords(page: Page, words: unknown[] = SAMPLE_WORDS) {
  await page.route("**/rest/v1/**", (route) =>
    route.fulfill({ contentType: "application/json", body: JSON.stringify(words) })
  );
}

export async function mockNetworkFailure(page: Page) {
  await page.route("**/rest/v1/**", (route) => route.fulfill({ status: 500, body: "Internal Server Error" }));
}

/**
 * 브라우저의 Web Speech API를 가짜로 대체해서, 실제 마이크/네트워크 음성 인식 없이도
 * 보이스 인터뷰 화면의 전체 플로우(녹음 시작 → 인식 결과 → 종료)를 결정적으로 테스트한다.
 */
export async function mockSpeechRecognition(page: Page, transcript = "테스트 답변입니다.") {
  await page.addInitScript((fakeTranscript) => {
    class FakeSpeechRecognition {
      continuous = true;
      interimResults = true;
      lang = "";
      onresult: ((event: unknown) => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((event: unknown) => void) | null = null;

      start() {
        setTimeout(() => {
          this.onresult?.({ results: [[{ transcript: fakeTranscript }]] });
        }, 50);
      }

      stop() {
        this.onend?.();
      }
    }

    // @ts-expect-error - 테스트 전용 전역 폴리필
    window.SpeechRecognition = FakeSpeechRecognition;
    // @ts-expect-error - 테스트 전용 전역 폴리필
    window.webkitSpeechRecognition = FakeSpeechRecognition;
  }, transcript);
}
