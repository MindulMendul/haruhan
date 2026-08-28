import { expect, test } from "./fixtures";

test.describe("개인정보처리방침 (/privacy)", () => {
  test("주요 섹션이 모두 보인다", async ({ page }) => {
    await page.goto("/privacy");

    await expect(page.getByText("수집하는 개인정보")).toBeVisible();
    await expect(page.getByText("제3자 제공")).toBeVisible();
    await expect(page.getByText("pencake33@naver.com", { exact: false })).toBeVisible();
  });
});
