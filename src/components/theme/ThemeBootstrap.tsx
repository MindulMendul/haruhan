import { APP_COLOR_SCHEME_KEY, type AppColorScheme } from "@/lib/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

export function ThemeBootstrap() {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem(APP_COLOR_SCHEME_KEY).then((stored) => {
      if (stored === "light" || stored === "dark") {
        setColorScheme(stored as AppColorScheme);
      }
    });
  }, [setColorScheme]);

  return null;
}

