import { expect, test } from "./fixtures";

test.describe("면접 연습 홈 (/interview)", () => {
  test("문제 풀이 카드가 /interview/practice로 이동한다", async ({ page }) => {
    await page.goto("/interview");
    await page.getByRole("link", { name: "문제 풀이 페이지로 이동" }).click();
    await expect(page).toHaveURL(/\/interview\/practice$/);
  });

  test("복기 분석 카드가 /interview/analysis로 이동한다", async ({ page }) => {
    await page.goto("/interview");
    await page.getByRole("link", { name: "복기 분석 페이지로 이동" }).click();
    await expect(page).toHaveURL(/\/interview\/analysis$/);
  });

  test("보이스 인터뷰 카드가 /interview/voice로 이동한다", async ({ page }) => {
    await page.goto("/interview");
    await page.getByRole("link", { name: "보이스 인터뷰 페이지로 이동" }).click();
    await expect(page).toHaveURL(/\/interview\/voice$/);
  });

  test("추천 포지션 카드를 누르면 해당 포지션이 선택된 JD 포지션 화면으로 이동한다", async ({ page }) => {
    await page.goto("/interview");

    await page.getByRole("link", { name: "Frontend Engineer 포지션 자세히 보기" }).click();

    await expect(page).toHaveURL(/\/job-positions\?position=fe/);
  });
});
