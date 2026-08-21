const CONTENT_API_BASE_URL = process.env.EXPO_PUBLIC_HARUHAN_API_URL ?? "http://132.226.238.218:18000";
const CONTENT_API_TIMEOUT_MS = 15000;

// 콘텐츠(CS 노트·포지션) 백엔드가 아직 없어서, 기본값은 "모킹 켜짐"이다.
// 실제 백엔드가 준비되면 EXPO_PUBLIC_CONTENT_API_MOCK=false로 끄면 된다.
export const CONTENT_API_MOCK_ENABLED = process.env.EXPO_PUBLIC_CONTENT_API_MOCK !== "false";

const MOCK_DELAY_MS = 300;

// 실제 네트워크 호출처럼 약간의 지연을 흉내 내, 로딩 상태를 그대로 확인할 수 있게 한다.
export function mockDelay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS));
}

export function mockNotFound(): never {
  throw new Error("콘텐츠 API 호출 실패 (status: 404)");
}

export async function fetchContentJson<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONTENT_API_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${CONTENT_API_BASE_URL}${path}`, {
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("콘텐츠 API 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`콘텐츠 API 호출 실패 (status: ${response.status})`);
  }

  return response.json() as Promise<T>;
}
