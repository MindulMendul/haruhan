import { beforeEach, describe, expect, it, vi } from "vitest";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ensureGuestAccessToken } from "./guestAuth";

const storage = new Map<string, string>();

vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn((key: string) => Promise.resolve(storage.get(key) ?? null)),
    setItem: vi.fn((key: string, value: string) => {
      storage.set(key, value);
      return Promise.resolve();
    }),
    multiSet: vi.fn((entries: [string, string][]) => {
      entries.forEach(([key, value]) => storage.set(key, value));
      return Promise.resolve();
    }),
  },
}));

describe("ensureGuestAccessToken", () => {
  beforeEach(() => {
    storage.clear();
  });

  it("저장된 토큰이 없으면 게스트 인증 API를 호출해 토큰을 저장한다", async () => {
    const token = await ensureGuestAccessToken();

    expect(token).toBe("mock-access-token");
    expect(storage.get(ACCESS_TOKEN_KEY)).toBe("mock-access-token");
    expect(storage.get(REFRESH_TOKEN_KEY)).toBe("mock-refresh-token");
  });

  it("이미 저장된 토큰이 있으면 그대로 반환한다", async () => {
    storage.set(ACCESS_TOKEN_KEY, "existing-token");

    const token = await ensureGuestAccessToken();

    expect(token).toBe("existing-token");
  });
});
