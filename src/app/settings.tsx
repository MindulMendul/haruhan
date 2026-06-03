import { Badge, Button, Card, Screen, Section } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { PAGE_SEO, SEO_ROBOTS } from "@/constants/seo";
import { Seo, buildWebPageJsonLd } from "@/lib/seo";
import { APP_COLOR_SCHEME_KEY, type AppColorScheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  async function updateColorScheme(nextScheme: AppColorScheme) {
    setColorScheme(nextScheme);
    await AsyncStorage.setItem(APP_COLOR_SCHEME_KEY, nextScheme);
  }

  return (
    <>
      <Seo
        title={PAGE_SEO.SETTINGS.title}
        description={PAGE_SEO.SETTINGS.description}
        path={PAGE_SEO.SETTINGS.path}
        robots={SEO_ROBOTS.NO_INDEX}
        jsonLd={buildWebPageJsonLd({
          title: PAGE_SEO.SETTINGS.title,
          description: PAGE_SEO.SETTINGS.description,
          path: PAGE_SEO.SETTINGS.path,
        })}
      />
      <Screen>
        <Card tone="inverted">
          <Badge variant="inverse">
            SETTINGS
          </Badge>
        <Text className="mt-5 text-[30px] font-extrabold leading-9 text-white">설정</Text>
        <Text className="mt-2 text-sm leading-6 text-ink-200 dark:text-ink-300">
          앱의 보기 방식과 탐색 UX를 조정합니다.
        </Text>
      </Card>

      <Section title="테마" description="다크모드는 저장되어 다음 실행 시에도 유지됩니다.">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-600/20">
              <Ionicons name={isDark ? "moon" : "sunny"} size={21} color={isDark ? "#d9e9ff" : "#245fdb"} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-extrabold text-ink-900 dark:text-white">다크모드</Text>
              <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">
                현재 {isDark ? "어두운 테마" : "밝은 테마"}를 사용 중입니다.
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            accessibilityLabel="다크모드 전환"
            accessibilityHint="앱 테마를 밝은 모드와 어두운 모드 사이에서 전환합니다."
            accessibilityState={{ checked: isDark }}
            onValueChange={(value) => updateColorScheme(value ? "dark" : "light")}
          />
        </View>
      </Section>

      <Section title="탐색 구조">
        <View className="gap-3">
          <View className="rounded-2xl bg-ink-50 p-4 dark:bg-ink-700">
            <Text className="text-sm font-extrabold text-ink-900 dark:text-white">오른쪽 사이드바</Text>
            <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">
              사이드바는 오른쪽에서 열리며, 세부 주제 바로가기용으로 사용합니다.
            </Text>
          </View>
          <View className="rounded-2xl bg-ink-50 p-4 dark:bg-ink-700">
            <Text className="text-sm font-extrabold text-ink-900 dark:text-white">하단 Nav</Text>
            <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">
              홈, 공통 CS, 포지션, 설정처럼 자주 쓰는 화면 이동을 담당합니다.
            </Text>
          </View>
        </View>
      </Section>

      <Section title="개발용 UI 샘플" description="Toast, Alert, Modal 컴포넌트를 확인하는 숨김 데모 페이지입니다.">
        <Button variant="outline" onPress={() => router.push(ROUTES.FEEDBACK)}>
          UI 컴포넌트 샘플 보기
        </Button>
      </Section>
      </Screen>
    </>
  );
}

