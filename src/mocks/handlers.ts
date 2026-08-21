import { http, HttpResponse } from "msw";
import { MOCK_CHAT_RESULT, MOCK_GUEST_AUTH_RESPONSE } from "./fixtures";

export const handlers = [
  http.post("*/api/v1/chat", async () => {
    return HttpResponse.json({ result: MOCK_CHAT_RESULT });
  }),

  http.post("*/api/v1/auth/guest", async () => {
    return HttpResponse.json(MOCK_GUEST_AUTH_RESPONSE, { status: 201 });
  }),
];
