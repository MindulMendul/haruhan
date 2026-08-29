import { expect, test } from "./fixtures";

test.describe("JD 포지션 (/job-positions)", () => {
  test("기본 포지션(FE) 정보와 대표 질문이 보인다", async ({ page }) => {
    await page.goto("/job-positions");

    await expect(page.getByText("면접에서 자주 보는 영역")).toBeVisible();
    await expect(page.getByText("대표 질문")).toBeVisible();
  });

  test("포지션 선택 모달에서 다른 포지션을 고르면 내용이 바뀌고 URL도 갱신된다", async ({ page }) => {
    await page.goto("/job-positions?position=fe");

    await page.getByRole("button", { name: "JD 포지션 선택 열기" }).click();
    await expect(page.getByText("JD 포지션 선택")).toBeVisible();

    await page.getByRole("button", { name: "Backend Engineer 선택" }).click();

    await expect(page).toHaveURL(/position=be/);
    await expect(page.getByText("JD 포지션 선택")).not.toBeVisible();
  });

  test("'면접 팁 보기' 버튼을 누르면 토스트가 뜬다", async ({ page }) => {
    await page.goto("/job-positions");

    await page.getByRole("button", { name: "면접 팁 보기" }).click();

    await expect(page.getByText("JD 읽는 팁")).toBeVisible();
  });
});
