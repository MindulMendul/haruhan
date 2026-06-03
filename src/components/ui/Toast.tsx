import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ToastVariant = "default" | "success" | "warning" | "destructive";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastMessage = ToastInput & {
  id: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, { container: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string }> = {
  default: {
    container: "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800",
    icon: "information-circle",
    iconColor: "#245fdb",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/10",
    icon: "checkmark-circle",
    iconColor: "#059669",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10",
    icon: "bulb",
    iconColor: "#d97706",
  },
  destructive: {
    container: "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10",
    icon: "alert-circle",
    iconColor: "#dc2626",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const nextId = useRef(1);
  const { colorScheme } = useColorScheme();
  const closeIconColor = colorScheme === "dark" ? "#cbd5e1" : "#94a3b8";

  const dismiss = useCallback((id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  const toast = useCallback(
    ({ duration = 3200, variant = "default", ...input }: ToastInput) => {
      const id = nextId.current++;
      setMessages((prev) => [...prev.slice(-2), { ...input, id, duration, variant }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" className="absolute bottom-24 left-0 right-0 z-50 px-4">
        <View className="mx-auto w-full max-w-[640px]">
          {messages.map((message) => {
            const style = variantStyles[message.variant ?? "default"];
            return (
              <TouchableOpacity
                key={message.id}
                activeOpacity={0.92}
                accessibilityRole="button"
                accessibilityLabel={message.description ? `${message.title}. ${message.description}` : message.title}
                accessibilityHint="토스트 메시지를 닫습니다."
                onPress={() => dismiss(message.id)}
                className={cn("mb-2 rounded-3xl border px-4 py-3 shadow-sm", style.container)}
              >
                <View className="flex-row items-start gap-3">
                  <Ionicons name={style.icon} size={21} color={style.iconColor} />
                  <View className="flex-1">
                    <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{message.title}</Text>
                    {message.description ? (
                      <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-200">{message.description}</Text>
                    ) : null}
                  </View>
                  <Ionicons name="close" size={16} color={closeIconColor} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return value;
}

