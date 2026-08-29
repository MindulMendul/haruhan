import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/mocks/server";
import { sendHaruhanChatMessage } from "./haruhanChat";

describe("sendHaruhanChatMessage", () => {
  it("정상 응답이면 result 문자열을 반환한다", async () => {
    const result = await sendHaruhanChatMessage("안녕");

    expect(result).toBe("테스트용 목 응답입니다.");
  });

  it("응답이 실패(4xx/5xx)면 에러를 던진다", async () => {
    server.use(
      http.post("*/api/v1/chat", () => new HttpResponse(null, { status: 500 }))
    );

    await expect(sendHaruhanChatMessage("안녕")).rejects.toThrow();
  });
});
