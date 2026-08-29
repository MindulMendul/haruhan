import { CS_TOPICS, getCsMarkdown } from "@/entities/cs-topic/content";
import { INTERVIEW_POSITIONS } from "@/entities/position/content/positions";
import { http, HttpResponse } from "msw";
import { MOCK_CHAT_RESULT, MOCK_GUEST_AUTH_RESPONSE } from "./fixtures";

// 콘텐츠 API가 실제 백엔드에 아직 없어서, 지금까지 앱에 번들해온
// CS 노트·포지션 데이터를 그대로 "API 응답"으로 흉내 낸다.
// 실제 백엔드가 생기면 이 두 핸들러만 지우면 된다.
export const handlers = [
  http.post("*/api/v1/chat", async () => {
    return HttpResponse.json({ result: MOCK_CHAT_RESULT });
  }),

  http.post("*/api/v1/auth/guest", async () => {
    return HttpResponse.json(MOCK_GUEST_AUTH_RESPONSE, { status: 201 });
  }),

  http.get("*/api/v1/content/cs-topics", async () => {
    return HttpResponse.json(CS_TOPICS);
  }),

  http.get("*/api/v1/content/cs-topics/:id", async ({ params }) => {
    const id = String(params.id);
    const topic = CS_TOPICS.find((t) => t.id === id);
    if (!topic) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json({ topic, body: getCsMarkdown(id) });
  }),

  http.get("*/api/v1/content/positions", async () => {
    return HttpResponse.json(INTERVIEW_POSITIONS);
  }),

  http.get("*/api/v1/content/positions/:id", async ({ params }) => {
    const id = String(params.id);
    const position = INTERVIEW_POSITIONS.find((p) => p.id === id);
    if (!position) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return HttpResponse.json(position);
  }),
];
