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

  it("이전 대화 기록을 전달하면 후속 질문을 구성할 수 있도록 프롬프트에 포함해 보낸다", async () => {
    let sentPrompt = "";
    server.use(
      http.post("*/api/v1/chat", async ({ request }) => {
        const body = (await request.json()) as { prompt: string };
        sentPrompt = body.prompt;
        return HttpResponse.json({ result: "테스트용 목 응답입니다." });
      })
    );

    await sendHaruhanChatMessage("그럼 TCP는 왜 느려?", [
      { role: "user", content: "TCP와 UDP의 차이가 뭐야?" },
      { role: "assistant", content: "TCP는 연결 지향, UDP는 비연결형이야." },
    ]);

    expect(sentPrompt).toContain("TCP와 UDP의 차이가 뭐야?");
    expect(sentPrompt).toContain("TCP는 연결 지향, UDP는 비연결형이야.");
    expect(sentPrompt).toContain("그럼 TCP는 왜 느려?");
  });
});
