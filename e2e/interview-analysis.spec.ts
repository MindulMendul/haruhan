import { expect, test } from "./fixtures";

test.describe("면접 복기 분석 (/interview/analysis)", () => {
  test("복기를 입력하기 전에는 분석 실행 버튼이 비활성화된다", async ({ page }) => {
    await page.goto("/interview/analysis");

    await expect(page.getByRole("button", { name: "분석 실행" })).toBeDisabled();
  });

  test("복기를 입력하고 분석을 실행하면 결과 3종이 보인다", async ({ page }) => {
    await page.goto("/interview/analysis");

    await page
      .getByPlaceholder("무엇을 물어봤고, 어떻게 답변했는지, 다음에는 무엇을 다르게 말할지 적어보세요.")
      .fill("자기소개를 물어봤고 명확하게 답변했다. 근데 긴장해서 조금 아쉬웠다.");

    await page.getByRole("button", { name: "분석 실행" }).click();

    await expect(page.getByText("잘한 점")).toBeVisible();
    await expect(page.getByText("개선 포인트")).toBeVisible();
    await expect(page.getByText("다음 연습")).toBeVisible();
  });
});
