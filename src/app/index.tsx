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
            면접 대비용 CS 노트는 앱에 번들되어 있어요. 카드 목록·무한 스크롤로 읽거나, 드로어에서 주제로 바로 이동할 수
            있습니다.
          </Text>
        </View>

        <Link href="/cs" asChild>
          <TouchableOpacity
            className="bg-indigo-600 py-4 rounded-full items-center justify-center shadow-md active:bg-indigo-700"
            activeOpacity={0.85}
          >
            <Text className="text-white text-[15px] font-semibold">CS 면접 노트 보러 가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
