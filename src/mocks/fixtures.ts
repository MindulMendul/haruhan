/**
 * 테스트 하네스 전역에서 재사용하는 목 데이터.
 * Vitest(MSW)와 Playwright(E2E) 양쪽이 같은 값을 참조하도록 여기 한 곳에서만 정의한다.
 */

export const MOCK_GUEST_AUTH_RESPONSE = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  token_type: "bearer",
} as const;

export const MOCK_CHAT_RESULT = "테스트용 목 응답입니다.";

export const MOCK_WORDS = [
  { id: 1, term: "TCP", definition: "**전송 제어 프로토콜**. 신뢰성 있는 연결 지향 통신을 보장합니다.", created_at: "2024-01-01" },
  { id: 2, term: "UDP", definition: "**비연결형 프로토콜**. 빠르지만 신뢰성은 낮습니다.", created_at: "2024-01-02" },
  { id: 3, term: "DNS", definition: "**도메인 네임 시스템**. 도메인을 IP 주소로 변환합니다.", created_at: "2024-01-03" },
] as const;
