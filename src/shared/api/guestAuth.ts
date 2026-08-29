import AsyncStorage from "@react-native-async-storage/async-storage";
import { HARUHAN_API_BASE_URL } from "./apiConfig";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

interface GuestAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

let pendingTokenRequest: Promise<string> | null = null;

async function requestGuestToken(): Promise<string> {
  const response = await fetch(`${HARUHAN_API_BASE_URL}/api/v1/auth/guest`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`게스트 인증 실패 (status: ${response.status})`);
  }

  const data: GuestAuthResponse = await response.json();
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, data.access_token],
    [REFRESH_TOKEN_KEY, data.refresh_token],
  ]);

  return data.access_token;
}

/**
 * localStorage(웹) / AsyncStorage(네이티브)에 저장된 access token이 있으면 그대로 반환하고,
 * 없으면 게스트 토큰을 새로 발급받아 저장한 뒤 반환한다.
 */
export async function ensureGuestAccessToken(): Promise<string> {
  const existing = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (existing) {
    return existing;
  }

  if (!pendingTokenRequest) {
    pendingTokenRequest = requestGuestToken().finally(() => {
      pendingTokenRequest = null;
    });
  }

  return pendingTokenRequest;
}

export async function getStoredAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}
