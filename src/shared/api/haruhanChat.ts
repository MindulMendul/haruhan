import { HARUHAN_API_BASE_URL, fetchWithTimeout } from "./apiConfig";

const HARUHAN_CHAT_MODEL = "qwen2.5:3b";
const HARUHAN_CHAT_TIMEOUT_MS = 20000;

// 백엔드가 대화 상태를 기억하지 않는 단일 prompt 필드만 받기 때문에, 이전 대화를
// 매 요청마다 프롬프트에 함께 실어 보내 AI가 사용자의 답변을 참고해 후속 질문을
// 구성할 수 있게 한다.
const HARUHAN_CHAT_SYSTEM_INSTRUCTION =
  "당신은 하루한의 CS 학습 도우미입니다. 아래 이전 대화에서 사용자가 답변한 내용을 참고해서, " +
  "그 답변의 이해도를 확인하거나 더 깊이 파고드는 후속 질문을 함께 제시해 주세요. " +
  "이미 답변받은 내용을 다시 묻지 마세요.";

export interface HaruhanChatTurn {
  role: "user" | "assistant";
  content: string;
}

interface HaruhanChatResponse {
  result: string;
}

function buildHaruhanChatPrompt(history: HaruhanChatTurn[], prompt: string): string {
  if (history.length === 0) {
    return `${HARUHAN_CHAT_SYSTEM_INSTRUCTION}\n\n사용자: ${prompt}`;
  }

  const transcript = history.map((turn) => `${turn.role === "user" ? "사용자" : "AI"}: ${turn.content}`).join("\n");

  return `${HARUHAN_CHAT_SYSTEM_INSTRUCTION}\n\n[이전 대화]\n${transcript}\n\n사용자: ${prompt}`;
}

export async function sendHaruhanChatMessage(prompt: string, history: HaruhanChatTurn[] = []): Promise<string> {
  const response = await fetchWithTimeout(
    `${HARUHAN_API_BASE_URL}/api/v1/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: buildHaruhanChatPrompt(history, prompt),
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
