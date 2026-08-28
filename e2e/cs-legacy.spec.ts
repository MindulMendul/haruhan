import { expect, test } from "./fixtures";

test.describe("공통 CS 레거시 (/cs/legacy)", () => {
  test("주제 카드 목록이 보이고, 카드를 누르면 상세 문서로 이동한다", async ({ page }) => {
    await page.goto("/cs/legacy");

    const firstTopic = page.getByRole("link", { name: /General CS Practical Deep Dive/ });
    await expect(firstTopic).toBeVisible();

    await firstTopic.click();

    // 이전 화면(주제 목록)이 스택 네비게이터에 숨겨진 채로 남아있어 subtitle/cardSummary
    // 같은 텍스트는 중복 매치될 수 있으므로, 상세 화면에만 있는 문서 경로로 확인한다.
    await expect(page).toHaveURL(/\/cs\/general-cs-practical-deep-dive$/);
    await expect(page.getByText("Interview Note")).toBeVisible();
    await expect(page.getByText("topics/general-cs-practical-deep-dive.md")).toBeVisible();
  });

  test("존재하지 않는 주제 id로 접근하면 안내 문구가 보인다", async ({ page }) => {
    await page.goto("/cs/this-topic-does-not-exist");

    await expect(page.getByText("존재하지 않는 주제입니다.")).toBeVisible();
  });
});
