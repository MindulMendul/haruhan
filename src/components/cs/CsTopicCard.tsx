import type { CsTopicMeta } from "@/types/cs";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CsTopicCardProps {
  topic: CsTopicMeta;
}

const CsTopicCardInner = ({ topic }: CsTopicCardProps) => {
  const router = useRouter();

  return (
    <View className="w-full items-center">
      <View className="w-full max-w-6xl px-5">
        <TouchableOpacity
          className="mb-3 overflow-hidden rounded-2xl border border-ink-200 bg-white px-5 py-4 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
          onPress={() => router.push(`/cs/${topic.id}`)}
          activeOpacity={0.9}
          accessibilityRole="link"
          accessibilityLabel={`${topic.title}. ${topic.subtitle}`}
          accessibilityHint="상세 문서를 엽니다."
        >
          <View className="flex-row items-start gap-3">
            <Text className="text-2xl">{topic.emoji}</Text>
            <View className="flex-1">
              <Text className="text-lg font-extrabold text-ink-900 dark:text-white">{topic.title}</Text>
              <Text className="text-xs text-ink-500 mt-0.5 dark:text-ink-300">{topic.subtitle}</Text>
              <Text className="text-sm text-ink-700 mt-2 leading-5 dark:text-ink-200">{topic.cardSummary}</Text>
            </View>
            <Text className="text-lg text-brand-600 dark:text-brand-200">›</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CsTopicCard = React.memo(CsTopicCardInner);
CsTopicCard.displayName = "CsTopicCard";
