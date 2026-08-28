import { expect, test } from "./fixtures";

test.describe("설정 (/settings)", () => {
  test("다크모드 스위치를 켜면 테마가 바뀌고 유지된다", async ({ page }) => {
    await page.goto("/settings");

    const themeSwitch = page.getByLabel("다크모드 전환");
    await expect(themeSwitch).toBeVisible();

    await themeSwitch.click();

    await expect(page.getByText("현재 어두운 테마를 사용 중입니다.")).toBeVisible();

    // 새로고침 후에도 저장된 다크모드가 유지되는지 확인한다.
    await page.reload();
    await expect(page.getByText("현재 어두운 테마를 사용 중입니다.")).toBeVisible();
  });

  test("개인정보처리방침 보기 버튼이 /privacy로 이동한다", async ({ page }) => {
    await page.goto("/settings");

    await page.getByRole("button", { name: "개인정보처리방침 보기" }).click();

    await expect(page).toHaveURL(/\/privacy$/);
  });
});
