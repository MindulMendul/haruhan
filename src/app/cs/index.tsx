import { CsTopicCard } from "@/components/cs/CsTopicCard";
import { CsTopicCardSkeleton } from "@/components/cs/CsTopicCardSkeleton";
import { useInfiniteCsTopics } from "@/hooks/useInfiniteCsTopics";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const LoadingView = () => (
  <View className="pt-4">
    {[1, 2, 3, 4].map((k) => (
      <CsTopicCardSkeleton key={k} />
    ))}
  </View>
);

export default function CsIndexScreen() {
  const { topics, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch, isFetching } =
    useInfiniteCsTopics();

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-slate-50">
        <Text className="text-lg font-bold text-red-500">불러오기 실패</Text>
        <Text className="text-slate-500 mt-2 text-center">{String(error)}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CsTopicCard topic={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        ListHeaderComponent={
          <View className="px-6 pt-2 pb-4">
            <Text className="text-sm text-slate-600 leading-5">
              번들에 포함된 CS 노트입니다. 카드를 탭하면 전체 마크다운을 펼칠 수 있어요. 드로어에서 주제로 바로 이동할 수도
              있습니다.
            </Text>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-2">
              <CsTopicCardSkeleton />
            </View>
          ) : null
        }
        ListEmptyComponent={isLoading || isFetching ? <LoadingView /> : null}
        refreshControl={<RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={() => refetch()} />}
      />
    </View>
  );
}
