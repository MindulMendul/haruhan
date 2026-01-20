import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      {/* 상단 헤더 타이틀 설정 */}
      <Stack.Screen options={{ title: "길을 잃었어요!" }} />

      <View className="flex-1 items-center justify-center p-5 bg-white">
        {/* 귀여운 아이콘이나 텍스트 */}
        <Text className="text-[80px] mb-5">🧭</Text>

        <Text className="text-2xl font-bold text-[#333] mb-2 text-center">이곳은 정의되지 않은 공간이에요</Text>

        <Text className="text-base text-[#777] text-center leading-6 mb-10">
          원하시는 페이지가 삭제되었거나{"\n"}
          잘못된 경로로 들어오신 것 같아요.
        </Text>

        {/* 메인으로 돌아가기 버튼 */}
        <Link href="/" asChild>
          <TouchableOpacity className="bg-[#f2a65a] px-10 py-4 rounded-full shadow-md active:opacity-80">
            <Text className="text-white text-base font-bold">홈으로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
