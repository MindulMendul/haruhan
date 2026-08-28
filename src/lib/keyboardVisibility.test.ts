import { afterEach, describe, expect, it, vi } from "vitest";

describe("useKeyboardVisibilityStore", () => {
  afterEach(() => {
    vi.doUnmock("react-native");
    vi.resetModules();
  });

  it("웹에서는 가상 키보드가 화면을 덮지 않으므로 show()를 호출해도 visible이 true가 되지 않는다", async () => {
    vi.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    const { useKeyboardVisibilityStore } = await import("./keyboardVisibility");

    useKeyboardVisibilityStore.getState().show();

    expect(useKeyboardVisibilityStore.getState().visible).toBe(false);
  });

  it("네이티브에서는 show()/hide()로 visible 상태가 실제로 바뀐다", async () => {
    vi.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    const { useKeyboardVisibilityStore } = await import("./keyboardVisibility");

    useKeyboardVisibilityStore.getState().show();
    expect(useKeyboardVisibilityStore.getState().visible).toBe(true);

    useKeyboardVisibilityStore.getState().hide();
    expect(useKeyboardVisibilityStore.getState().visible).toBe(false);
  });
});
