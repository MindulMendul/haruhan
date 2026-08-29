import { useKeyboardVisibilityStore } from "@/shared/lib/keyboardVisibility";
import { useEffect } from "react";
import { Keyboard } from "react-native";

/**
 * 네이티브(iOS/Android)에서 시스템 키보드 표시/숨김을 전역 상태에 반영한다.
 * 웹에서는 Keyboard API가 아무 동작도 하지 않는 shim이라(react-native-web),
 * 각 입력창이 자신의 focus/blur로 직접 상태를 갱신한다.
 */
export function KeyboardVisibilityBootstrap() {
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => useKeyboardVisibilityStore.getState().show());
    const hideSub = Keyboard.addListener("keyboardDidHide", () => useKeyboardVisibilityStore.getState().hide());

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return null;
}
