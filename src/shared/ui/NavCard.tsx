import { Ionicons } from "@expo/vector-icons";
import { Link, type Href } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface NavCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
  iconTone?: "brand" | "ink";
  showChevron?: boolean;
  accessibilityHint?: string;
}

export function NavCard({
  title,
  description,
  icon,
  href,
  iconTone = "brand",
  showChevron = false,
  accessibilityHint,
}: NavCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconTileClass = iconTone === "ink" ? "bg-ink-900 dark:bg-white" : "bg-brand-600";
  // ink 톤은 라이트=어두운 타일/흰 아이콘, 다크=흰 타일/어두운 아이콘으로 대비를 맞춘다.
  const iconColor = iconTone === "ink" ? (isDark ? "#0f172a" : "#ffffff") : "#ffffff";

  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className="rounded-[24px] border border-ink-200 bg-white p-5 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
        activeOpacity={0.86}
        accessibilityRole="link"
        accessibilityLabel={`${title}. ${description}`}
        accessibilityHint={accessibilityHint ?? "해당 화면으로 이동합니다."}
      >
        <View className="flex-row items-center gap-4">
          <View className={`h-11 w-11 items-center justify-center rounded-2xl ${iconTileClass}`}>
            <Ionicons name={icon} size={22} color={iconColor} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-extrabold text-ink-900 dark:text-white">{title}</Text>
            <Text className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{description}</Text>
          </View>
          {showChevron ? <Ionicons name="chevron-forward" size={18} color="#94a3b8" /> : null}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
