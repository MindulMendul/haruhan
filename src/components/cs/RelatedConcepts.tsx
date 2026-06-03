import { getRelatedTopics } from "@/content/cs";
import type { CsTopicMeta } from "@/types/cs";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RelatedConceptsProps {
  topicId: string;
  compact?: boolean;
}

function RelatedConceptCard({ topic }: { topic: CsTopicMeta }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-2 rounded-xl border border-ink-200 bg-white px-4 py-3 active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
      activeOpacity={0.86}
      accessibilityRole="link"
      accessibilityLabel={`${topic.title} 관련 개념`}
      accessibilityHint="해당 개념 문서로 이동합니다."
      onPress={() => router.push(`/cs/${topic.id}`)}
    >
      <View className="flex-row items-start gap-3">
        <Text className="text-xl">{topic.emoji}</Text>
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{topic.title}</Text>
          <Text className="mt-1 text-xs leading-4 text-ink-500 dark:text-ink-300">{topic.cardSummary}</Text>
        </View>
        <Text className="text-lg text-brand-600 dark:text-brand-200">›</Text>
      </View>
    </TouchableOpacity>
  );
}

export function RelatedConcepts({ topicId, compact = false }: RelatedConceptsProps) {
  const relatedTopics = getRelatedTopics(topicId, compact ? 2 : 3);

  if (relatedTopics.length === 0) return null;

  return (
    <View className={compact ? "mt-4" : "mt-6"}>
      <View className="mb-3 overflow-hidden rounded-xl border border-ink-200 bg-ink-50 dark:border-ink-700 dark:bg-ink-800">
        <View className="border-b border-ink-200 bg-ink-100 px-4 py-2 dark:border-ink-700 dark:bg-ink-700">
          <Text className="text-sm font-extrabold text-ink-900 dark:text-white">꼬리 개념</Text>
        </View>
        <View className="px-4 py-3">
          <Text className="text-xs leading-5 text-ink-600 dark:text-ink-200">
            이 문서를 읽은 뒤 이어서 보면 좋은 개념입니다. 탭하면 해당 문서로 이동합니다.
          </Text>
        </View>
      </View>

      {relatedTopics.map((topic) => (
        <RelatedConceptCard key={topic.id} topic={topic} />
      ))}
    </View>
  );
}

