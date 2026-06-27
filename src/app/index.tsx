import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { ROUTES } from "@/constants/routes";
import { PAGE_SEO } from "@/constants/seo";
import { Seo, buildOrganizationJsonLd, buildWebPageJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function QuickCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href:
    | typeof ROUTES.CS
    | typeof ROUTES.INTERVIEW_PRACTICE
    | typeof ROUTES.INTERVIEW_ANALYSIS
    | typeof ROUTES.INTERVIEW_VOICE
    | typeof ROUTES.SETTINGS;
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className="mb-3 rounded-[24px] border border-ink-200 bg-white px-5 py-4 shadow-sm transition active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
        activeOpacity={0.86}
        accessibilityRole="link"
        accessibilityLabel={`${title}. ${description}`}
        accessibilityHint="해당 화면으로 이동합니다."
      >
        <View className="flex-row items-center gap-4">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 dark:bg-white">
            <Ionicons name={icon} size={22} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-ink-900 dark:text-white">{title}</Text>
            <Text className="mt-1 text-sm leading-5 text-ink-500 dark:text-ink-300">{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title={PAGE_SEO.HOME.title}
        description={PAGE_SEO.HOME.description}
        path={PAGE_SEO.HOME.path}
        keywords={[...PAGE_SEO.HOME.keywords]}
        jsonLd={[
          buildOrganizationJsonLd(),
          buildWebSiteJsonLd(),
          buildWebPageJsonLd({
            title: PAGE_SEO.HOME.title,
            description: PAGE_SEO.HOME.description,
            path: PAGE_SEO.HOME.path,
          }),
        ]}
      />
      <Screen>
        <View className="space-y-5">
          <Card className="rounded-[32px] border border-ink-200 bg-white p-6 shadow-sm dark:border-ink-700 dark:bg-ink-900">
            <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-ink-300">
              하루한
            </Text>
            <Text className="mt-4 text-3xl font-extrabold text-ink-900 dark:text-white">면접 준비를 더 간결하게</Text>
            <Text className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
              필요한 기능만 깔끔하게 보여줍니다.
            </Text>
          </Card>

          <View className="space-y-3">
            <QuickCard
              title="공부"
              description="한 번에 하나씩, CS 객관식 문제를 풉니다."
              icon="book-outline"
              href={ROUTES.CS}
            />
            <QuickCard
              title="문제"
              description="포지션 문제를 빠르게 확인하고 연습합니다."
              icon="help-circle-outline"
              href={ROUTES.INTERVIEW_PRACTICE}
            />
            <QuickCard
              title="복기"
              description="면접 후 느낀 점을 입력하고 개선 포인트를 확인합니다."
              icon="clipboard-outline"
              href={ROUTES.INTERVIEW_ANALYSIS}
            />
            <QuickCard
              title="면접"
              description="인성 질문을 말로 연습하고 다음 질문으로 자동 이동합니다."
              icon="mic-outline"
              href={ROUTES.INTERVIEW_VOICE}
            />
          </View>

          <View className="rounded-[28px] border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-800">
            <Text className="text-sm font-semibold text-ink-900 dark:text-white">설정</Text>
            <Text className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
              설정은 홈에서 빠르게 이동할 수 있습니다.
            </Text>
            <View className="mt-4">
              <Link href={ROUTES.SETTINGS} asChild>
                <Button variant="secondary" className="w-full">
                  설정 열기
                </Button>
              </Link>
            </View>
          </View>
        </View>
      </Screen>
    </>
  );
}
