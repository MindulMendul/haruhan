import { COMMON_CS_TOPICS, CS_PAGE_SIZE } from "@/entities/cs-topic/content";
import { useFlattenedPages } from "@/shared/hooks/useFlattenedPages";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { CsTopicMeta } from "@/shared/types/cs";

export function useInfiniteCsTopics() {
  const query = useInfiniteQuery({
    queryKey: ["cs-topics", "common"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }): Promise<CsTopicMeta[]> => {
      const start = pageParam * CS_PAGE_SIZE;
      return COMMON_CS_TOPICS.slice(start, start + CS_PAGE_SIZE);
    },
    getNextPageParam: (_lastPage, allPages) => {
      const loaded = allPages.reduce((n, p) => n + p.length, 0);
      return loaded < COMMON_CS_TOPICS.length ? allPages.length : undefined;
    },
  });

  const topics = useFlattenedPages<CsTopicMeta>(query.data?.pages);

  return {
    ...query,
    topics,
  };
}
