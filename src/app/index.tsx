import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-gray-50 items-center">
      <View className="w-full max-w-[1440px] px-6 pt-20">
        <View className="mb-8">
          <Text className="text-[40px] font-bold text-gray-900 text-center">하루한</Text>
          <Text className="mt-2 text-sm text-gray-500 text-center">면접용 CS을 정리해보는 시간</Text>
        </View>

        <View className="bg-white rounded-2xl p-4 border border-gray-200 mb-6 shadow-sm">
          <Text className="text-sm text-gray-600 leading-5 text-center">
            면접 대비를 위한 CS 개념 학습 도구입니다. 아래의 버튼을 통해 핵심 개념을 마스터해보세요.
          </Text>
        </View>

        <Link href="/network" asChild>
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-full items-center justify-center shadow-md active:bg-blue-600"
            activeOpacity={0.85}
          >
            <Text className="text-white text-[15px] font-semibold">네트워크 개념 학습하러 가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
