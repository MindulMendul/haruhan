import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface AppModalProps {
  visible: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

export function AppModal({ visible, title, description, children, footer, onClose }: AppModalProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#cbd5e1" : "#64748b";

  return (
    <Modal animationType="fade" transparent visible={visible} accessibilityViewIsModal onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/45 px-4 pb-6">
        <View
          className="mx-auto w-full max-w-[560px] rounded-[32px] border border-ink-200 bg-white p-5 shadow-sm dark:border-ink-700 dark:bg-ink-800"
          accessibilityRole="summary"
          accessibilityLabel={description ? `${title}. ${description}` : title}
        >
          <View className="flex-row items-start gap-4">
            <View className="flex-1">
              <Text className="text-xl font-extrabold text-ink-900 dark:text-white">{title}</Text>
              {description ? <Text className="mt-2 text-sm leading-6 text-ink-500 dark:text-ink-200">{description}</Text> : null}
            </View>
            <TouchableOpacity
              className={cn("h-10 w-10 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-700")}
              activeOpacity={0.82}
              accessibilityRole="button"
              accessibilityLabel="모달 닫기"
              accessibilityHint="현재 모달 창을 닫습니다."
              onPress={onClose}
            >
              <Ionicons name="close" size={19} color={iconColor} />
            </TouchableOpacity>
          </View>

          {children ? <View className="mt-5">{children}</View> : null}
          {footer ? <View className="mt-5 flex-row gap-2">{footer}</View> : null}
        </View>
      </View>
    </Modal>
  );
}

