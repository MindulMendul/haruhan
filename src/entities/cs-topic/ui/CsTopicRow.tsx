import { getCsTopicRoute } from "@/shared/config/routes";
import type { CsTopicMeta } from "@/shared/types/cs";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CsTopicVariant = "card" | "row";

interface CsTopicRowProps {
  topic: CsTopicMeta;
  variant?: CsTopicVariant;
}

export function CsTopicRow({ topic, variant = "row" }: Readonly<CsTopicRowProps>) {
  const router = useRouter();
  const isCard = variant === "card";

  const button = (
    <TouchableOpacity
      className={
        isCard
          ? "mb-3 overflow-hidden rounded-2xl border border-ink-200 bg-white px-5 py-4 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
          : "mb-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
      }
      activeOpacity={isCard ? 0.9 : 0.86}
      accessibilityRole="link"
      accessibilityLabel={`${topic.title}. ${isCard ? topic.subtitle : topic.cardSummary}`}
      accessibilityHint={isCard ? "상세 문서를 엽니다." : "관련 CS 문서로 이동합니다."}
      onPress={() => router.push(getCsTopicRoute(topic.id))}
    >
      <View className="flex-row items-start gap-3">
        <Text className={isCard ? "text-2xl" : "text-xl"}>{topic.emoji}</Text>
        <View className="flex-1">
          <Text
            className={`font-extrabold text-ink-900 dark:text-white ${isCard ? "text-lg" : "text-sm"}`}
          >
            {topic.title}
          </Text>
          {isCard ? (
            <Text className="text-xs text-ink-500 mt-0.5 dark:text-ink-300">{topic.subtitle}</Text>
          ) : null}
          <Text
            className={
              isCard
                ? "text-sm text-ink-700 mt-2 leading-5 dark:text-ink-200"
                : "mt-1 text-xs leading-4 text-ink-500 dark:text-ink-300"
            }
          >
            {topic.cardSummary}
          </Text>
        </View>
        <Text className="text-lg text-brand-600 dark:text-brand-200">›</Text>
      </View>
    </TouchableOpacity>
  );

  if (isCard) {
    return (
      <View className="w-full items-center">
        <View className="w-full max-w-6xl px-5">{button}</View>
      </View>
    );
  }

  return button;
}
