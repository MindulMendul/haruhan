import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

/** CS 카드 전용 스켈레톤 (이모지 자리 + 제목 2줄 + 요약 막대) */
export const CsTopicCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.65, duration: 900, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View className="w-full items-center px-5 mb-3">
      <Animated.View
        style={{ opacity }}
        className="w-full max-w-6xl rounded-2xl border border-ink-200 bg-white p-4 flex-row gap-3 overflow-hidden dark:border-ink-700 dark:bg-ink-800"
      >
        <View className="w-10 h-10 rounded-xl bg-ink-200 dark:bg-ink-700" />
        <View className="flex-1 gap-2">
          <View className="h-5 w-[85%] rounded-md bg-ink-200 dark:bg-ink-700" />
          <View className="h-3 w-[40%] rounded-md bg-ink-100 dark:bg-ink-700" />
          <View className="h-3 w-full rounded-md bg-ink-100 mt-1 dark:bg-ink-700" />
          <View className="h-3 w-[92%] rounded-md bg-ink-100 dark:bg-ink-700" />
        </View>
      </Animated.View>
    </View>
  );
};
