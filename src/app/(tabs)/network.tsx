import WordCard from "@/components/WordCard";
import { useQueryWord } from "@/hooks/useQueryWord";
import React from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const { data: words = [], isLoading, isError, error, refetch } = useQueryWord("network_terms_test");

  // 로딩 상태
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f2a65a" />
        <Text className="mt-3 text-sm text-[#b38b5f] text-center">따뜻한 개념들을 불러오는 중이에요…</Text>
      </View>
    );
  }

  // 에러 상태
  if (isError || !words) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-white">
        <Text className="text-[50px] mb-5">⚠️</Text>
        <Text className="text-xl font-bold text-[#333] mb-2 text-center">개념을 불러오지 못했어요</Text>
        <Text className="text-[15px] text-[#777] text-center leading-[22px] mb-2">
          네트워크 연결을 확인하거나{"\n"}잠시 후 다시 시도해주세요.
        </Text>

        <Text className="text-[12px] text-[#ccc] mb-[30px]">{error?.message}</Text>

        <TouchableOpacity
          className="bg-[#f2a65a] px-8 py-3 rounded-full shadow-md"
          onPress={() => refetch()}
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-semibold">다시 시도하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 데이터 없음 상태
  if (words?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-base text-[#b38b5f] text-center">아직 준비된 단어가 없어요.</Text>
      </View>
    );
  }

  // 리스트 렌더링
  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={words}
        renderItem={({ item }) => <WordCard item={item} />}
        keyExtractor={(item, index) => `${item.term}-${index}`}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, paddingTop: 20 }}
      />
    </View>
  );
}
