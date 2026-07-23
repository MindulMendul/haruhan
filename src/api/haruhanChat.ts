const HARUHAN_API_BASE_URL = process.env.EXPO_PUBLIC_HARUHAN_API_URL ?? "http://132.226.238.218:18000";
const HARUHAN_CHAT_MODEL = "qwen2.5:3b";
const HARUHAN_CHAT_TIMEOUT_MS = 20000;

interface HaruhanChatResponse {
  result: string;
}

export async function sendHaruhanChatMessage(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HARUHAN_CHAT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${HARUHAN_API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: HARUHAN_CHAT_MODEL,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("하루한 채팅 API 응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`하루한 채팅 API 호출 실패 (status: ${response.status})`);
  }

  const data: HaruhanChatResponse = await response.json();
  return data.result;
}
