import { CsTopicRow } from "@/entities/cs-topic/ui/CsTopicRow";
import { getRelatedTopics } from "@/entities/cs-topic/content";
import React from "react";
import { Text, View } from "react-native";

interface RelatedConceptsProps {
  topicId: string;
  compact?: boolean;
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
        <CsTopicRow key={topic.id} topic={topic} />
      ))}
    </View>
  );
}

