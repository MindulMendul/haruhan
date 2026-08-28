import { expect, test } from "./fixtures";

test.describe("홈 화면", () => {
  test("히어로 카드와 4개 빠른 이동 카드가 보인다", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("면접 준비를 더 간결하게")).toBeVisible();
    await expect(page.getByRole("link", { name: /^AI\./ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^문제\./ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^기록\./ })).toBeVisible();
    await expect(page.getByRole("link", { name: /^면접\./ })).toBeVisible();
  });

  test("AI 카드를 누르면 /cs로 이동한다", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /^AI\./ }).click();

    await expect(page).toHaveURL(/\/cs$/);
    await expect(page.getByText("공부 AI 채팅")).toBeVisible();
  });

  test("설정 카드의 '설정 열기' 버튼이 /settings로 이동한다", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "설정 열기" }).click();

    await expect(page).toHaveURL(/\/settings$/);
  });
});
