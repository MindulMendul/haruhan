import { PAGE_SEO, SEO_ROBOTS } from "@/constants/seo";
import { Seo } from "@/lib/seo";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Seo
        title={PAGE_SEO.NOT_FOUND.title}
        description={PAGE_SEO.NOT_FOUND.description}
        path={PAGE_SEO.NOT_FOUND.path}
        robots={SEO_ROBOTS.NO_INDEX}
      />
      {/* 상단 헤더 타이틀 설정 */}
      <Stack.Screen options={{ title: "길을 잃었어요!" }} />

      <View className="flex-1 items-center justify-center p-5 bg-paper dark:bg-ink-900">
        {/* 귀여운 아이콘이나 텍스트 */}
        <Text className="text-[80px] mb-5">🧭</Text>

        <Text className="text-2xl font-bold text-ink-900 mb-2 text-center dark:text-white">이곳은 정의되지 않은 공간이에요</Text>

        <Text className="text-base text-ink-500 text-center leading-6 mb-10 dark:text-ink-300">
          원하시는 페이지가 삭제되었거나{"\n"}
          잘못된 경로로 들어오신 것 같아요.
        </Text>

        {/* 메인으로 돌아가기 버튼 */}
        <Link href="/" asChild>
          <TouchableOpacity className="bg-brand-600 px-10 py-4 rounded-full shadow-md active:opacity-80">
            <Text className="text-white text-base font-bold">홈으로 돌아가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}
