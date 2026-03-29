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
        className="w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 flex-row gap-3 overflow-hidden"
      >
        <View className="w-10 h-10 rounded-xl bg-slate-200" />
        <View className="flex-1 gap-2">
          <View className="h-5 w-[85%] rounded-md bg-slate-200" />
          <View className="h-3 w-[40%] rounded-md bg-slate-100" />
          <View className="h-3 w-full rounded-md bg-slate-100 mt-1" />
          <View className="h-3 w-[92%] rounded-md bg-slate-100" />
        </View>
      </Animated.View>
    </View>
  );
};
