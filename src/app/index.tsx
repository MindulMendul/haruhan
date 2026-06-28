import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { NavCard } from "@/shared/ui/NavCard";
import { Screen } from "@/shared/ui/Screen";
import { ROUTES } from "@/shared/config/routes";
import { PAGE_SEO } from "@/shared/config/seo";
import { Seo, buildOrganizationJsonLd, buildWebPageJsonLd, buildWebSiteJsonLd } from "@/shared/lib/seo";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

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
            <NavCard
              title="공부"
              description="한 번에 하나씩, CS 객관식 문제를 풉니다."
              icon="book-outline"
              href={ROUTES.CS}
              iconTone="ink"
            />
            <NavCard
              title="문제"
              description="포지션 문제를 빠르게 확인하고 연습합니다."
              icon="help-circle-outline"
              href={ROUTES.INTERVIEW_PRACTICE}
              iconTone="ink"
            />
            <NavCard
              title="복기"
              description="면접 후 느낀 점을 입력하고 개선 포인트를 확인합니다."
              icon="clipboard-outline"
              href={ROUTES.INTERVIEW_ANALYSIS}
              iconTone="ink"
            />
            <NavCard
              title="면접"
              description="인성 질문을 말로 연습하고 다음 질문으로 자동 이동합니다."
              icon="mic-outline"
              href={ROUTES.INTERVIEW_VOICE}
              iconTone="ink"
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
