import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export { APP_COLOR_SCHEME_KEY } from "@/shared/config/app";

export type AppColorScheme = "light" | "dark";

// 하루한 브랜드 팔레트(tailwind.config.js의 brand/ink)를 shadcn 스타일 시맨틱 토큰에 매핑한 값.
// tailwind.config.js / src/app/global.css의 CSS 변수와 반드시 같은 값을 유지해야 한다.
export const THEME = {
  light: {
    background: "hsl(225 100% 99%)",
    foreground: "hsl(222 47% 11%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(222 47% 11%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(222 47% 11%)",
    primary: "hsl(221 72% 50%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(222 47% 11%)",
    secondaryForeground: "hsl(0 0% 100%)",
    muted: "hsl(210 40% 96%)",
    mutedForeground: "hsl(215 16% 47%)",
    accent: "hsl(210 40% 96%)",
    accentForeground: "hsl(222 47% 11%)",
    destructive: "hsl(0 72% 51%)",
    destructiveForeground: "hsl(0 0% 100%)",
    border: "hsl(214 32% 91%)",
    input: "hsl(214 32% 91%)",
    ring: "hsl(219 92% 58%)",
    radius: "1rem",
  },
  dark: {
    background: "hsl(222 47% 11%)",
    foreground: "hsl(210 40% 98%)",
    card: "hsl(217 33% 17%)",
    cardForeground: "hsl(210 40% 98%)",
    popover: "hsl(217 33% 17%)",
    popoverForeground: "hsl(210 40% 98%)",
    primary: "hsl(221 72% 50%)",
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(0 0% 100%)",
    secondaryForeground: "hsl(222 47% 11%)",
    muted: "hsl(217 33% 17%)",
    mutedForeground: "hsl(213 27% 84%)",
    accent: "hsl(215 25% 27%)",
    accentForeground: "hsl(210 40% 98%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 100%)",
    border: "hsl(215 25% 27%)",
    input: "hsl(215 25% 27%)",
    ring: "hsl(217 100% 68%)",
    radius: "1rem",
  },
} as const;

export const NAV_THEME: Record<AppColorScheme, Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};

