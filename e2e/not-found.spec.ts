import { expect, test } from "./fixtures";

test.describe("404 (+not-found)", () => {
  test("존재하지 않는 경로로 접근하면 안내 화면이 보이고 홈으로 돌아갈 수 있다", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");

    await expect(page.getByText("이곳은 정의되지 않은 공간이에요")).toBeVisible();

    await page.getByRole("link", { name: "홈으로 돌아가기" }).click();

    await expect(page).toHaveURL(/\/$/);
  });
});
