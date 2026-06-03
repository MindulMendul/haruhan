import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomNavItem = {
  href: typeof ROUTES.HOME | typeof ROUTES.CS | typeof ROUTES.SETTINGS;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  match: (pathname: string) => boolean;
  featured?: boolean;
};

const NAV_ITEMS: BottomNavItem[] = [
  {
    href: ROUTES.CS,
    label: "공부",
    icon: "book-outline",
    match: (pathname) => pathname.startsWith(ROUTES.CS) || pathname.startsWith(ROUTES.JOB_POSITIONS),
  },
  {
    href: ROUTES.HOME,
    label: "홈",
    icon: "home",
    match: (pathname) => pathname === ROUTES.HOME,
    featured: true,
  },
  {
    href: ROUTES.SETTINGS,
    label: "설정",
    icon: "settings-outline",
    match: (pathname) => pathname.startsWith(ROUTES.SETTINGS),
  },
];

export function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className="border-t border-ink-200 bg-paper px-4 pt-2 dark:border-ink-700 dark:bg-ink-950"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View
        className="mx-auto w-full max-w-[640px] flex-row rounded-[28px] border border-white bg-white p-1.5 shadow-sm dark:border-ink-700 dark:bg-ink-800"
        accessibilityRole="tablist"
      >
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <TouchableOpacity
              key={item.href}
              className={`min-w-[88px] flex-1 items-center justify-center rounded-[22px] px-3 ${
                item.featured ? "-mt-5 py-3" : "py-2.5"
              } ${active ? "bg-brand-600" : item.featured ? "bg-ink-900 dark:bg-brand-600" : "bg-transparent"}`}
              activeOpacity={0.82}
              accessibilityRole="tab"
              accessibilityLabel={`${item.label} 탭`}
              accessibilityState={{ selected: active }}
              onPress={() => router.push(item.href)}
            >
              <View
                className={`items-center justify-center ${
                  item.featured ? "h-11 w-11 rounded-full" : ""
                }`}
              >
                <Ionicons
                  name={item.icon}
                  size={item.featured ? 23 : 20}
                  color={active || item.featured ? "#ffffff" : isDark ? "#cbd5e1" : "#64748b"}
                />
              </View>
              <Text
                className={`mt-1 text-[11px] font-extrabold ${
                  active ? "text-white" : item.featured ? "text-white" : "text-ink-500 dark:text-ink-300"
                }`}
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
