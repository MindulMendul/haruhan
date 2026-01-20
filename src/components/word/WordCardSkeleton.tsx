import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export const WordCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View className="w-full items-center">
      <View className="w-full max-w-6xl">
        <Animated.View
          style={{
            opacity,
            height: 150,
            width: "100%",
            backgroundColor: "#e4e4e7",
            borderRadius: 20,
            marginBottom: 20,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 제목 바 */}
          <View
            style={{
              width: "70%",
              height: 24,
              backgroundColor: "#d4d4d8",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />

          {/* 설명 바 */}
          <View
            style={{
              width: "45%",
              height: 16,
              backgroundColor: "#d4d4d8",
              borderRadius: 8,
            }}
          />
        </Animated.View>
      </View>
    </View>
  );
};
