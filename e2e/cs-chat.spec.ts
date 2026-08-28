import { expect, mockChatFailure, mockChatResponse, test } from "./fixtures";

test.describe("공부 AI 채팅 (/cs)", () => {
  test("빈 상태 문구가 보이고, 기존 학습 자료 링크로 이동할 수 있다", async ({ page }) => {
    await page.goto("/cs");

    await expect(page.getByText("아직 대화가 없습니다.")).toBeVisible();

    await page.getByRole("button", { name: "기존 학습 자료로 이동" }).click();

    await expect(page).toHaveURL(/\/cs\/legacy$/);
    await expect(page.getByText("공통 CS (레거시)")).toBeVisible();
  });

  test("메시지를 보내면 사용자 말풍선과 AI 응답이 순서대로 보인다", async ({ page }) => {
    // 로딩 상태가 관찰될 수 있도록 응답에 약간의 지연을 준다.
    await mockChatResponse(page, "오늘 하루도 고생 많았어요!", 500);
    await page.goto("/cs");

    await page.getByLabel("채팅 메시지 입력").fill("오늘 하루 힘들었는데 한마디 해줘");
    await page.getByRole("button", { name: "전송" }).click();

    await expect(page.getByText("오늘 하루 힘들었는데 한마디 해줘")).toBeVisible();
    await expect(page.getByText("답변을 생각하는 중...")).toBeVisible();
    await expect(page.getByText("오늘 하루도 고생 많았어요!")).toBeVisible();
  });

  test("API 호출이 실패하면 에러 토스트가 뜬다", async ({ page }) => {
    await mockChatFailure(page);
    await page.goto("/cs");

    await page.getByLabel("채팅 메시지 입력").fill("테스트");
    await page.getByRole("button", { name: "전송" }).click();

    await expect(page.getByText("응답을 받지 못했습니다")).toBeVisible();
  });
});
