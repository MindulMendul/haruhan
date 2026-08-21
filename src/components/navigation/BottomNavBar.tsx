import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomNavItem = {
  href:
    | typeof ROUTES.CS
    | typeof ROUTES.HOME
    | typeof ROUTES.INTERVIEW_PRACTICE
    | typeof ROUTES.INTERVIEW_ANALYSIS
    | typeof ROUTES.INTERVIEW_VOICE;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  match: (pathname: string) => boolean;
};

const NAV_ITEMS: BottomNavItem[] = [
  {
    href: ROUTES.HOME,
    label: "홈",
    icon: "home-outline",
    activeIcon: "home",
    match: (pathname) => pathname === ROUTES.HOME,
  },
  {
    href: ROUTES.INTERVIEW_PRACTICE,
    label: "문제",
    icon: "help-circle-outline",
    activeIcon: "help-circle",
    match: (pathname) => pathname.startsWith(ROUTES.INTERVIEW_PRACTICE),
  },
  {
    href: ROUTES.CS,
    label: "공부",
    icon: "book-outline",
    activeIcon: "book",
    match: (pathname) => pathname.startsWith(ROUTES.CS),
  },
  {
    href: ROUTES.INTERVIEW_VOICE,
    label: "면접",
    icon: "mic-outline",
    activeIcon: "mic",
    match: (pathname) => pathname.startsWith(ROUTES.INTERVIEW_VOICE),
  },
  {
    href: ROUTES.INTERVIEW_ANALYSIS,
    label: "복기",
    icon: "clipboard-outline",
    activeIcon: "clipboard",
    match: (pathname) => pathname.startsWith(ROUTES.INTERVIEW_ANALYSIS),
  },
];

export function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const activeColor = isDark ? "#5b9aff" : "#245fdb";
  const inactiveColor = isDark ? "#64748b" : "#94a3b8";

  return (
    <View
      className="w-full flex-row border-t border-ink-200 bg-paper dark:border-ink-800 dark:bg-ink-950"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
      accessibilityRole="tablist"
    >
      <View className="mx-auto w-full max-w-[640px] flex-row">
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <TouchableOpacity
              key={item.href}
              className="min-w-0 flex-1 items-center justify-center gap-1 py-2"
              activeOpacity={0.6}
              accessibilityRole="tab"
              accessibilityLabel={`${item.label} 탭`}
              accessibilityState={{ selected: active }}
              onPress={() => router.push(item.href)}
            >
              <Ionicons name={active ? item.activeIcon : item.icon} size={22} color={active ? activeColor : inactiveColor} />
              <Text
                numberOfLines={1}
                className={cn(
                  "text-[11px]",
                  active ? "font-bold text-brand-600 dark:text-brand-400" : "font-medium text-ink-400 dark:text-ink-500"
                )}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
