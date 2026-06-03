import { CsTopicCard } from "@/components/cs/CsTopicCard";
import { CsTopicCardSkeleton } from "@/components/cs/CsTopicCardSkeleton";
import { SearchField } from "@/components/ui";
import { COMMON_CS_TOPICS, getCsMarkdown } from "@/content/cs";
import { useInfiniteCsTopics } from "@/hooks/useInfiniteCsTopics";
import { matchesSearchQuery } from "@/lib/search";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

const LoadingView = () => (
  <View className="pt-4">
    {[1, 2, 3, 4].map((k) => (
      <CsTopicCardSkeleton key={k} />
    ))}
  </View>
);

export default function CsIndexScreen() {
  const [query, setQuery] = useState("");
  const { topics, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch, isFetching } =
    useInfiniteCsTopics();
  const trimmedQuery = query.trim();
  const searchResults = useMemo(
    () =>
      COMMON_CS_TOPICS.filter((topic) =>
        matchesSearchQuery(
          {
            title: topic.title,
            subtitle: topic.subtitle,
            cardSummary: topic.cardSummary,
            body: getCsMarkdown(topic.id),
          },
          trimmedQuery
        )
      ),
    [trimmedQuery]
  );
  const visibleTopics = trimmedQuery.length > 0 ? searchResults : topics;

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-slate-50">
        <Text className="text-lg font-bold text-red-500">불러오기 실패</Text>
        <Text className="text-slate-500 mt-2 text-center">{String(error)}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-paper dark:bg-ink-900">
      <FlatList
        data={visibleTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CsTopicCard topic={item} />}
        onEndReached={() => {
          if (trimmedQuery.length === 0 && hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 12 }}
        ListHeaderComponent={
          <View className="px-5 pb-4">
            <View className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm dark:border-ink-700 dark:bg-ink-800">
              <View className="border-b border-ink-200 bg-ink-50 px-5 py-3 dark:border-ink-700 dark:bg-ink-700">
                <Text className="text-base font-extrabold text-ink-900 dark:text-white">공통 CS 면접 노트</Text>
                <Text className="mt-1 text-xs text-ink-500 dark:text-ink-300">
                  네트워크·OS·자료구조·보안처럼 포지션 공통으로 보는 개념
                </Text>
              </View>
              <View className="px-5 py-4">
                <Text className="text-sm leading-6 text-ink-600 dark:text-ink-200">
                  FE 전용 브라우저/React 개념은 JD 포지션의 FE 탭으로 옮겼어요. 여기서는 어떤 포지션에서도 기본기로 보는
                  CS 주제를 먼저 정리합니다. 카드를 누르면 상세 문서로 바로 이동합니다.
                </Text>
              </View>
            </View>
            <SearchField
              value={query}
              onChangeText={setQuery}
              placeholder="검색: OS, ㅇㅅ, vmfhsxm, 트랜잭션..."
              className="mt-4"
            />
            {trimmedQuery.length > 0 ? (
              <Text
                className="mt-3 text-center text-xs font-semibold text-ink-500 dark:text-ink-300"
                accessibilityRole="text"
                accessibilityLabel={`검색 결과 ${searchResults.length}개`}
              >
                {searchResults.length}개 결과
              </Text>
            ) : null}
          </View>
        }
        ListFooterComponent={
          trimmedQuery.length === 0 && isFetchingNextPage ? (
            <View className="py-2">
              <CsTopicCardSkeleton />
            </View>
          ) : null
        }
        ListEmptyComponent={
          isLoading || isFetching ? (
            <LoadingView />
          ) : (
            <View className="px-6 py-10">
              <Text className="text-center text-sm font-bold text-ink-500 dark:text-ink-300">검색 결과가 없습니다.</Text>
            </View>
          )
        }
        refreshControl={<RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={() => refetch()} />}
      />
    </View>
  );
}
