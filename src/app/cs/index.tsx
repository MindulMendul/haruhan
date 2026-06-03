import { CsTopicCard } from "@/components/cs/CsTopicCard";
import { CsTopicCardSkeleton } from "@/components/cs/CsTopicCardSkeleton";
import { AppModal, SearchField } from "@/components/ui";
import { getCsTopicRoute } from "@/constants/routes";
import { PAGE_SEO } from "@/constants/seo";
import { COMMON_CS_TOPICS, getCsMarkdown } from "@/content/cs";
import { useInfiniteCsTopics } from "@/hooks/useInfiniteCsTopics";
import { matchesSearchQuery } from "@/lib/search";
import { Seo, buildBreadcrumbJsonLd, buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

const LoadingView = () => (
  <View className="pt-4">
    {[1, 2, 3, 4].map((k) => (
      <CsTopicCardSkeleton key={k} />
    ))}
  </View>
);

export default function CsIndexScreen() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#d9e9ff" : "#ffffff";
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
    <>
      <Seo
        title={PAGE_SEO.CS_INDEX.title}
        description={PAGE_SEO.CS_INDEX.description}
        path={PAGE_SEO.CS_INDEX.path}
        keywords={[...PAGE_SEO.CS_INDEX.keywords]}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.CS_INDEX.title,
            description: PAGE_SEO.CS_INDEX.description,
            path: PAGE_SEO.CS_INDEX.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: "공통 CS", path: PAGE_SEO.CS_INDEX.path },
          ]),
          buildItemListJsonLd(
            COMMON_CS_TOPICS.map((topic) => ({
              name: topic.title,
              description: topic.cardSummary,
              path: getCsTopicRoute(topic.id),
            }))
          ),
        ]}
      />
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
            trimmedQuery.length > 0 ? (
              <View className="px-5 pb-4">
                <Text
                  className="text-center text-xs font-semibold text-ink-500 dark:text-ink-300"
                  accessibilityRole="text"
                  accessibilityLabel={`검색 결과 ${searchResults.length}개`}
                >
                  {searchResults.length}개 결과
                </Text>
              </View>
            ) : null
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
        <TouchableOpacity
          className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-brand-600 shadow-sm active:bg-brand-700 dark:bg-brand-500"
          activeOpacity={0.86}
          accessibilityRole="button"
          accessibilityLabel="CS 노트 검색 열기"
          accessibilityHint="검색창을 열어 공통 CS 면접 노트를 검색합니다."
          onPress={() => setSearchOpen(true)}
        >
          <Ionicons name="search" size={24} color={iconColor} />
          {trimmedQuery.length > 0 ? (
            <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-ink-900 dark:border-ink-900 dark:bg-white">
              <Text className="text-[10px] font-extrabold text-white dark:text-ink-900">{searchResults.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>

        <AppModal
          visible={searchOpen}
          title="CS 노트 검색"
          description="키워드, 초성, 영문 자판으로 입력한 한글까지 검색할 수 있어요."
          onClose={() => setSearchOpen(false)}
        >
          <SearchField
            value={query}
            onChangeText={setQuery}
            placeholder="검색: OS, ㅇㅅ, vmfhsxm, 트랜잭션..."
            autoFocus
          />
          <View className="mt-4 rounded-2xl bg-ink-50 px-4 py-3 dark:bg-ink-700">
            <Text className="text-xs font-bold text-ink-500 dark:text-ink-300">
              {trimmedQuery.length > 0 ? `${searchResults.length}개 결과가 목록에 표시됩니다.` : "검색어를 입력하면 목록이 바로 필터링됩니다."}
            </Text>
          </View>
        </AppModal>
      </View>
    </>
  );
}
