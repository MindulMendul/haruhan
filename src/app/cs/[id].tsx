import { RelatedConcepts } from "@/components/cs/RelatedConcepts";
import { WikiMarkdown } from "@/components/cs/WikiMarkdown";
import { getCsTopicRoute } from "@/constants/routes";
import { PAGE_SEO, SEO_ROBOTS } from "@/constants/seo";
import { getCsMarkdown, getTopicById } from "@/content/cs";
import { Seo, buildArticleJsonLd, buildBreadcrumbJsonLd, toSeoDescription } from "@/lib/seo";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function CsTopicDetailScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const topic = id ? getTopicById(id) : undefined;
  const body = id ? getCsMarkdown(id) : "";

  if (!id || !topic) {
    return (
      <>
        <Seo title="존재하지 않는 CS 노트" description="요청한 CS 면접 노트를 찾을 수 없습니다." path={PAGE_SEO.CS_INDEX.path} robots={SEO_ROBOTS.NO_INDEX} />
        <View className="flex-1 justify-center items-center p-6 bg-paper dark:bg-ink-900">
          <Text className="text-ink-600 dark:text-ink-300">존재하지 않는 주제입니다.</Text>
        </View>
      </>
    );
  }

  const shortTitle = `${topic.emoji} ${topic.title.split("(")[0].trim()}`;
  const seoTitle = `${topic.title} 면접 노트`;
  const seoDescription = toSeoDescription(`${topic.cardSummary} ${topic.subtitle} ${body}`);
  const path = getCsTopicRoute(topic.id);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        type="article"
        keywords={[topic.title, topic.subtitle, "CS 면접", "개발자 면접", "하루한"]}
        jsonLd={[
          buildArticleJsonLd({
            title: seoTitle,
            description: seoDescription,
            path,
            keywords: [topic.title, topic.subtitle, "CS 면접"],
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: "공통 CS", path: PAGE_SEO.CS_INDEX.path },
            { name: topic.title, path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: shortTitle }} />
      <ScrollView className="flex-1 bg-paper dark:bg-ink-900" contentContainerStyle={{ padding: 14, paddingBottom: 52 }}>
        <View className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-800">
          <View className="border-b border-ink-200 bg-ink-50 px-5 py-4 dark:border-ink-700 dark:bg-ink-700">
            <Text className="text-xs font-bold uppercase tracking-wide text-brand-700 dark:text-brand-200">Interview Note</Text>
            <Text className="mt-1 text-2xl font-extrabold leading-8 text-ink-900 dark:text-white">
              {topic.emoji} {topic.title}
            </Text>
            <Text className="mt-1 text-sm leading-5 text-ink-600 dark:text-ink-200">{topic.subtitle}</Text>
          </View>

          <View className="mx-5 mt-4 overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700">
            <View className="flex-row border-b border-ink-200 bg-ink-100 dark:border-ink-700 dark:bg-ink-700">
              <Text className="w-24 px-3 py-2 text-xs font-extrabold text-ink-800 dark:text-ink-100">문서</Text>
              <Text className="flex-1 border-l border-ink-200 px-3 py-2 text-xs text-ink-700 dark:border-ink-700 dark:text-ink-200">
                {topic.file}
              </Text>
            </View>
            <View className="flex-row bg-white dark:bg-transparent">
              <Text className="w-24 px-3 py-2 text-xs font-extrabold text-ink-800 dark:text-ink-100">요약</Text>
              <Text className="flex-1 border-l border-ink-200 px-3 py-2 text-xs leading-5 text-ink-700 dark:border-ink-700 dark:text-ink-200">
                {topic.cardSummary}
              </Text>
            </View>
          </View>

          <View className="px-5 py-5">
            <WikiMarkdown body={body} showToc />
            <RelatedConcepts topicId={topic.id} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
