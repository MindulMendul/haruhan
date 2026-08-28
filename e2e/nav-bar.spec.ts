import { expect, test } from "./fixtures";

const TABS: { label: string; urlPattern: RegExp }[] = [
  { label: "공부", urlPattern: /\/$/ },
  { label: "문제", urlPattern: /\/interview\/practice$/ },
  { label: "AI", urlPattern: /\/cs$/ },
  { label: "면접", urlPattern: /\/interview\/voice$/ },
  { label: "기록", urlPattern: /\/interview\/analysis$/ },
];

// 활성 탭 라벨 색상(brand-600) / 비활성 탭 라벨 색상(ink-400). react-native-web은
// accessibilityState.selected를 aria-selected로 매핑하지 않으므로, 실제로 화면에
// 반영되는 색상으로 활성 탭 여부를 검증한다.
const ACTIVE_COLOR = "rgb(36, 95, 219)";
const INACTIVE_COLOR = "rgb(148, 163, 184)";

test.describe("하단 Nav Bar", () => {
  test("5개 탭이 모두 보이고, 각 탭을 누르면 해당 화면으로 이동한다", async ({ page }) => {
    await page.goto("/");

    for (const tab of TABS) {
      await page.getByRole("tab", { name: `${tab.label} 탭` }).click();
      await expect(page).toHaveURL(tab.urlPattern);
    }
  });

  test("현재 화면에 해당하는 탭만 활성 색상으로 표시된다", async ({ page }) => {
    await page.goto("/cs");

    const studyLabel = page.getByRole("tab", { name: "AI 탭" }).getByText("AI");
    await expect(studyLabel).toHaveCSS("color", ACTIVE_COLOR);

    const homeLabel = page.getByRole("tab", { name: "공부 탭" }).getByText("공부");
    await expect(homeLabel).toHaveCSS("color", INACTIVE_COLOR);
  });
});
