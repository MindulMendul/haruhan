import { CsTopicCard } from "@/components/cs/CsTopicCard";
import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { PAGE_SEO, SEO_ROBOTS } from "@/constants/seo";
import { COMMON_CS_TOPIC_IDS } from "@/content/cs";
import { useCsTopics } from "@/hooks/useCsTopics";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const COMMON_IDS: readonly string[] = COMMON_CS_TOPIC_IDS;

export default function CsLegacyScreen() {
  const { data: topics, isLoading, isError } = useCsTopics();
  const commonTopics = (topics ?? []).filter((topic) => COMMON_IDS.includes(topic.id));

  return (
    <>
      <Seo
        title={PAGE_SEO.CS_LEGACY.title}
        description={PAGE_SEO.CS_LEGACY.description}
        path={PAGE_SEO.CS_LEGACY.path}
        keywords={[...PAGE_SEO.CS_LEGACY.keywords]}
        robots={SEO_ROBOTS.NO_INDEX}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.CS_LEGACY.title,
            description: PAGE_SEO.CS_LEGACY.description,
            path: PAGE_SEO.CS_LEGACY.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: "공통 CS (레거시)", path: PAGE_SEO.CS_LEGACY.path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: PAGE_SEO.CS_LEGACY.title }} />
      <Screen>
        <Section
          title="공통 CS (레거시)"
          description="핵심 개념과 실전 질문을 문서로 정리했습니다. 각 카드를 눌러 자세한 내용을 확인하세요."
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : isError ? (
            <Text className="text-sm text-ink-500 dark:text-ink-300">목록을 불러오지 못했습니다.</Text>
          ) : (
            <View className="space-y-3">
              {commonTopics.map((topic) => (
                <CsTopicCard key={topic.id} topic={topic} />
              ))}
            </View>
          )}
        </Section>
      </Screen>
    </>
  );
}
