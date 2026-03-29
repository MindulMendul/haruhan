import { CS_PAGE_SIZE, CS_TOPICS } from "@/content/cs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { CsTopicMeta } from "@/types/cs";

export function useInfiniteCsTopics() {
  const query = useInfiniteQuery({
    queryKey: ["cs-topics", "bundled"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }): Promise<CsTopicMeta[]> => {
      const start = pageParam * CS_PAGE_SIZE;
      return CS_TOPICS.slice(start, start + CS_PAGE_SIZE);
    },
    getNextPageParam: (_lastPage, allPages) => {
      const loaded = allPages.reduce((n, p) => n + p.length, 0);
      return loaded < CS_TOPICS.length ? allPages.length : undefined;
    },
  });

  const topics = useMemo(
    () => query.data?.pages.flatMap((p) => p) ?? [],
    [query.data?.pages]
  );

  return {
    ...query,
    topics,
  };
}
