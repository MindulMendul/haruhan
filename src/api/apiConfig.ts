// 하루한 백엔드(게스트 인증, 채팅, 콘텐츠 API 등)가 공유하는 베이스 URL.
// 여러 api/*.ts 파일에서 같은 상수를 각자 복붙하지 않도록 여기서 한 번만 정의한다.
export const HARUHAN_API_BASE_URL = process.env.EXPO_PUBLIC_HARUHAN_API_URL ?? "http://132.226.238.218:18000";

/**
 * `fetch`에 타임아웃을 붙인다. 지정한 시간 안에 응답이 없으면 요청을 중단(abort)하고
 * `timeoutMessage`로 에러를 던진다. 그 외 네트워크 에러는 그대로 다시 던진다.
 */
export async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs: number,
  timeoutMessage: string
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(timeoutMessage);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
