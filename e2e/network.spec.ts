import { expect, mockNetworkFailure, mockNetworkWords, test } from "./fixtures";

test.describe("네트워크 용어 (/network)", () => {
  test("단어 목록이 보이고, 카드를 누르면 정의가 펼쳐진다", async ({ page }) => {
    await mockNetworkWords(page);
    await page.goto("/network");

    await expect(page.getByText("TCP")).toBeVisible();
    await expect(page.getByText("UDP")).toBeVisible();

    await page.getByText("TCP").click();

    await expect(page.getByText("전송 제어 프로토콜", { exact: false })).toBeVisible();
  });

  test("목록을 불러오지 못하면 에러 화면과 재시도 버튼이 보인다", async ({ page }) => {
    await mockNetworkFailure(page);
    await page.goto("/network");

    // react-query가 최대 3번 재시도(지수 백오프)한 뒤에야 에러 상태가 되므로 타임아웃을 넉넉히 둔다.
    await expect(page.getByText("에러가 발생했어요")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText("다시 시도")).toBeVisible();
  });
});
