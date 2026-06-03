import { Badge } from "@/components/ui/Badge";
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
  accent,
}: {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: typeof ROUTES.CS | typeof ROUTES.JOB_POSITIONS;
  accent: string;
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className="mb-3 rounded-[28px] border border-ink-200 bg-white p-5 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
        activeOpacity={0.86}
        accessibilityRole="link"
        accessibilityLabel={`${title}. ${description}`}
        accessibilityHint="해당 화면으로 이동합니다."
      >
        <View className="flex-row items-start gap-4">
          <View className={`h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
            <Ionicons name={icon} size={23} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-extrabold text-ink-900 dark:text-white">{title}</Text>
            <Text className="mt-1 text-sm leading-5 text-ink-500 dark:text-ink-300">{description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
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
        <Card tone="inverted" className="overflow-hidden p-6">
          <Badge variant="inverse">
            INTERVIEW PREP
          </Badge>
          <Text className="mt-6 text-[42px] font-extrabold leading-[48px] text-white">하루한</Text>
          <Text className="mt-3 text-base leading-6 text-ink-200 dark:text-ink-300">
            공통 CS는 기본기로, 포지션별 질문은 실무 맥락으로 나눠 준비해요.
          </Text>

          <View className="mt-6 flex-row gap-2">
            <View className="rounded-full bg-white/10 px-3 py-2">
              <Text className="text-xs font-bold text-white">공통 CS</Text>
            </View>
            <View className="rounded-full bg-white/10 px-3 py-2">
              <Text className="text-xs font-bold text-white">JD 포지션</Text>
            </View>
            <View className="rounded-full bg-white/10 px-3 py-2">
              <Text className="text-xs font-bold text-white">꼬리 개념</Text>
            </View>
          </View>
        </Card>

        <View className="mt-5">
          <QuickCard
            title="공통 CS"
            description="네트워크, OS, 자료구조, 보안처럼 모든 포지션에 걸리는 기본기를 봅니다."
            icon="library-outline"
            href={ROUTES.CS}
            accent="bg-brand-600"
          />

          <QuickCard
            title="포지션별 면접"
            description="FE, BE, Infra, SRE, AI/ML 등 JD별로 자주 물어보는 영역을 정리합니다."
            icon="briefcase-outline"
            href={ROUTES.JOB_POSITIONS}
            accent="bg-ink-900"
          />
        </View>

        <View className="mt-2 rounded-[28px] border border-brand-100 bg-brand-50 p-5 dark:border-brand-600/40 dark:bg-brand-600/20">
          <Text className="text-sm font-extrabold text-brand-700 dark:text-brand-100">오늘의 학습 흐름</Text>
          <Text className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-200">
            먼저 공통 CS에서 기본 개념을 잡고, 포지션 탭에서 내 JD에 맞는 질문과 관련 노트를 이어서 확인해보세요.
          </Text>
        </View>
      </Screen>
    </>
  );
}
