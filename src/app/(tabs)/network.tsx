import WordCard from "@/components/word/WordCard";
import { WordCardSkeleton } from "@/components/word/WordCardSkeleton";
import { useInfiniteWords } from "@/hooks/useInfiniteWords";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const LoadingView = () => (
  <View className="self-stretch px-5 pt-5">
    {[1, 2, 3, 4, 5].map((key) => (
      <WordCardSkeleton key={key} />
    ))}
  </View>
);

const EmptyView = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-base text-[#b38b5f] text-center">아직 준비된 단어가 없어요.</Text>
  </View>
);

const ErrorView = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <View className="flex-1 justify-center items-center p-5 bg-white">
    <Text className="text-xl font-bold">에러가 발생했어요</Text>
    <Text className="text-gray-400 mb-5">{message}</Text>
    <TouchableOpacity onPress={onRetry} className="bg-[#f2a65a] px-6 py-2 rounded-full">
      <Text className="text-white">다시 시도</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  const { words, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } =
    useInfiniteWords("network_terms_test");

  console.log("렌더링 상태:", {
    wordCount: words.length,
    isLoading,
    showSkeleton: isLoading && words.length === 0,
  });

  if (isError) return <ErrorView message={error?.message} onRetry={refetch} />;
  return (
    <View className="flex-1 bg-gray-50 ">
      <FlatList
        data={words}
        renderItem={({ item }) => <WordCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        // 데이터가 끝에 도달했을 때 실행
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5} // 리스트 끝의 50% 지점에 도달하면 미리 로드
        contentContainerStyle={words.length === 0 ? { flexGrow: 1 } : { paddingBottom: 20, paddingHorizontal: 40 }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="px-5 pb-10">
              <WordCardSkeleton />
            </View>
          ) : null
        }
        ListEmptyComponent={isLoading ? <LoadingView /> : <EmptyView />}
        refreshing={isLoading}
        onRefresh={refetch}
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
