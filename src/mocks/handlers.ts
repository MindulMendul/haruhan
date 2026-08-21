import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("*/api/v1/chat", async () => {
    return HttpResponse.json({ result: "테스트용 목 응답입니다." });
  }),

  http.post("*/api/v1/auth/guest", async () => {
    return HttpResponse.json(
      {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        token_type: "bearer",
      },
      { status: 201 }
    );
  }),
];
