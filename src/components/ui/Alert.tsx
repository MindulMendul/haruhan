import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

type AlertVariant = "default" | "info" | "warning" | "destructive";

interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  className?: string;
  children?: React.ReactNode;
}

const variants: Record<AlertVariant, { container: string; icon: keyof typeof Ionicons.glyphMap; iconColor: string }> = {
  default: {
    container: "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800",
    icon: "information-circle",
    iconColor: "#64748b",
  },
  info: {
    container: "border-brand-100 bg-brand-50 dark:border-brand-500/30 dark:bg-brand-600/10",
    icon: "information-circle",
    iconColor: "#245fdb",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10",
    icon: "warning",
    iconColor: "#d97706",
  },
  destructive: {
    container: "border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10",
    icon: "alert-circle",
    iconColor: "#dc2626",
  },
};

export function Alert({ title, description, variant = "default", className, children }: AlertProps) {
  const style = variants[variant];
  const { colorScheme } = useColorScheme();
  const iconColor = variant === "default" && colorScheme === "dark" ? "#cbd5e1" : style.iconColor;

  return (
    <View
      className={cn("rounded-3xl border px-4 py-3", style.container, className)}
      accessibilityRole="alert"
      accessibilityLabel={description ? `${title}. ${description}` : title}
    >
      <View className="flex-row items-start gap-3">
        <Ionicons name={style.icon} size={21} color={iconColor} />
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{title}</Text>
          {description ? <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-200">{description}</Text> : null}
          {children ? <View className="mt-3">{children}</View> : null}
        </View>
      </View>
    </View>
  );
}

