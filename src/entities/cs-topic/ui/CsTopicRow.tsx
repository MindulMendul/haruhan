import { getCsTopicRoute } from "@/shared/config/routes";
import type { CsTopicMeta } from "@/shared/types/cs";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CsTopicRowProps {
  topic: CsTopicMeta;
}

export function CsTopicRow({ topic }: CsTopicRowProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
      activeOpacity={0.86}
      accessibilityRole="link"
      accessibilityLabel={`${topic.title}. ${topic.cardSummary}`}
      accessibilityHint="관련 CS 문서로 이동합니다."
      onPress={() => router.push(getCsTopicRoute(topic.id))}
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
