import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/constants/routes";
import { PAGE_SEO } from "@/constants/seo";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function RecordCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}) {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity
        className="rounded-[28px] border border-ink-200 bg-white p-5 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
        activeOpacity={0.86}
        accessibilityRole="link"
        accessibilityLabel={`${title} 페이지로 이동`}
      >
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-600">
            <Ionicons name={icon} size={22} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-extrabold text-ink-900 dark:text-white">{title}</Text>
            <Text className="mt-1 text-sm leading-6 text-ink-600 dark:text-ink-300">{description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function RecordsScreen() {
  return (
    <>
      <Seo
        title="기록"
        description="면접 복기 같은 기록을 남기고 다시 확인합니다."
        path={PAGE_SEO.INTERVIEW.path + "/analysis"}
        keywords={[...PAGE_SEO.INTERVIEW.keywords, "면접 복기", "기록", "회고"]}
        jsonLd={[
          buildWebPageJsonLd({
            title: "기록",
            description: "면접 복기 같은 기록을 남기고 다시 확인합니다.",
            path: `${PAGE_SEO.INTERVIEW.path}/analysis`,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
            { name: "기록", path: `${PAGE_SEO.INTERVIEW.path}/analysis` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: "기록" }} />
      <Screen>
        <Section title="기록" description="남겨둘 수 있는 기록 종류입니다. 카드를 눌러 시작하세요.">
          <View className="space-y-3">
            <RecordCard
              title="면접 복기"
              description="면접 후 답변 흐름과 느낀 점을 입력하면 잘한 점과 개선 포인트를 자동으로 정리해줍니다."
              icon="clipboard-outline"
              href={ROUTES.INTERVIEW_RECAP}
            />
          </View>
        </Section>
      </Screen>
    </>
  );
}
