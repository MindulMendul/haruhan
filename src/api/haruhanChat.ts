import { HARUHAN_API_BASE_URL, fetchWithTimeout } from "./apiConfig";

const HARUHAN_CHAT_MODEL = "qwen2.5:3b";
const HARUHAN_CHAT_TIMEOUT_MS = 20000;

interface HaruhanChatResponse {
  result: string;
}

export async function sendHaruhanChatMessage(prompt: string): Promise<string> {
  const response = await fetchWithTimeout(
    `${HARUHAN_API_BASE_URL}/api/v1/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: HARUHAN_CHAT_MODEL,
      }),
    },
    HARUHAN_CHAT_TIMEOUT_MS,
    "하루한 채팅 API 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요."
  );

  if (!response.ok) {
    throw new Error(`하루한 채팅 API 호출 실패 (status: ${response.status})`);
  }

  const data: HaruhanChatResponse = await response.json();
  return data.result;
}
