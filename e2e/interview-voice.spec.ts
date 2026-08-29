import { expect, mockSpeechRecognition, test } from "./fixtures";

test.describe("보이스 인터뷰 (/interview/voice)", () => {
  test("3개 질문을 모두 답하면 완료 화면과 레이더 차트가 보인다", async ({ page }) => {
    await mockSpeechRecognition(page, "테스트 답변입니다.");
    await page.goto("/interview/voice");

    await expect(page.getByText("질문 1 / 3")).toBeVisible();

    for (let i = 1; i <= 3; i++) {
      await expect(page.getByText(`질문 ${i} / 3`)).toBeVisible();

      await page.getByRole("button", { name: "말하기 시작" }).click();
      await expect(page.getByText("테스트 답변입니다.")).toBeVisible();

      await page.getByRole("button", { name: "말하기 종료" }).click();
      await expect(page.getByText("녹음 완료")).toBeVisible();

      await page.getByRole("button", { name: "다음으로 넘어가기" }).click();
    }

    await expect(page.getByText("모든 질문을 완료했습니다.")).toBeVisible();
    await expect(page.getByText("총 3개 질문을 연습했습니다.")).toBeVisible();
    await expect(page.getByText("발화량").first()).toBeVisible();
  });

  test("음성 인식을 지원하지 않는 브라우저에서는 안내 카드가 보인다", async ({ page }) => {
    await page.addInitScript(() => {
      // @ts-expect-error - 테스트에서만 강제로 지원 안 함 상태를 만든다.
      delete window.SpeechRecognition;
      // @ts-expect-error - 테스트에서만 강제로 지원 안 함 상태를 만든다.
      delete window.webkitSpeechRecognition;
    });

    await page.goto("/interview/voice");

    await expect(page.getByText("음성 인식이 지원되지 않습니다.")).toBeVisible();
  });
});
