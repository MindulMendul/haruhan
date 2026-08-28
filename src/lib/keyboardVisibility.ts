import { Platform } from "react-native";
import { create } from "zustand";

interface KeyboardVisibilityState {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

/**
 * 키보드가 떠 있는지 앱 전역에서 구독할 수 있는 상태. 네이티브에서만 의미가 있다.
 * 웹에는 화면을 덮는 가상 키보드가 없어서, 입력창에 포커스가 가도 화면 공간을 내줄 필요가 없다.
 * (오히려 포커스/블러마다 Nav Bar가 사라졌다 나타나며 레이아웃이 흔들려 클릭이 씹히는 문제가 있었다.)
 * 그래서 show()는 네이티브에서만 실제로 상태를 바꾸고, 웹에서는 항상 false로 유지한다.
 */
export const useKeyboardVisibilityStore = create<KeyboardVisibilityState>((set) => ({
  visible: false,
  show: () => {
    if (Platform.OS === "web") return;
    set({ visible: true });
  },
  hide: () => set({ visible: false }),
}));
