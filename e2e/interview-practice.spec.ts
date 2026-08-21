import { expect, test } from "./fixtures";

test.describe("면접 문제 풀이", () => {
  test("포지션 목록에서 하나를 고르면 해당 포지션 문제 풀이로 이동한다", async ({ page }) => {
    await page.goto("/interview/practice");

    await page.getByRole("link", { name: "Frontend Engineer 면접 문제 풀이로 이동" }).click();

    await expect(page).toHaveURL(/\/interview\/practice\/fe$/);
    await expect(page.getByText(/문제 1 \//)).toBeVisible();
  });

  test("객관식 문제를 끝까지 풀면 결과지와 레이더 차트가 보인다", async ({ page }) => {
    await page.goto("/interview/practice/fe");

    const progressText = await page.getByText(/문제 1 \/ \d+/).textContent();
    const total = Number(progressText?.split("/")[1]?.trim());
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      // 매 문제마다 첫 번째 보기를 선택하고(정답 여부와 무관) 다음으로 넘어간다.
      await page.getByRole("button", { name: /^보기: / }).first().click();
      await expect(page.getByText(/정답입니다!|아쉽지만 오답입니다\./)).toBeVisible();
      await page.getByRole("button", { name: "다음 문제로" }).click();
    }

    await expect(page.getByText("모든 문제를 완료했습니다.")).toBeVisible();
    await expect(page.getByText(/맞은 문제 \d+ \/ \d+/)).toBeVisible();

    await page.getByRole("button", { name: "문제 다시 시작" }).click();
    await expect(page.getByText(/문제 1 \//)).toBeVisible();
  });
});
