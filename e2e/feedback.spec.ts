import { expect, test } from "./fixtures";

test.describe("Feedback UI 데모 (/feedback)", () => {
  test("토스트 버튼을 누르면 토스트 메시지가 뜬다", async ({ page }) => {
    await page.goto("/feedback");

    await page.getByRole("button", { name: "팁 Toast 띄우기" }).click();

    await expect(page.getByText("면접 팁")).toBeVisible();
  });

  test("Alert 3종이 항상 보인다", async ({ page }) => {
    await page.goto("/feedback");

    await expect(page.getByText("정보", { exact: true })).toBeVisible();
    await expect(page.getByText("주의", { exact: true })).toBeVisible();
    await expect(page.getByText("위험", { exact: true })).toBeVisible();
  });

  test("Modal을 열고 닫을 수 있다", async ({ page }) => {
    await page.goto("/feedback");

    await page.getByRole("button", { name: "Modal 열기" }).click();
    await expect(page.getByText("Modal 예시")).toBeVisible();

    await page.getByRole("button", { name: "취소" }).click();
    await expect(page.getByText("Modal 예시")).not.toBeVisible();
  });

  test("React Native Reusables 데모(Text/Separator/Skeleton)가 보인다", async ({ page }) => {
    await page.goto("/feedback");

    await expect(page.getByText("제목 (h2)")).toBeVisible();
    await expect(page.getByText("본문 아래 부가 설명에 쓰는 muted 텍스트입니다.")).toBeVisible();
  });
});
