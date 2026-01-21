import { getSupabase } from "@/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useInfiniteWords = (dataKey: string) => {
  const query = useInfiniteQuery({
    queryKey: [dataKey, "infinite"],
    queryFn: async ({ pageParam = 0 }): Promise<Word[]> => {
      try {
        const { data, error } = await getSupabase(pageParam, dataKey);
        if (error) {
          console.error("Supabase API 에러:", error);
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error("QueryFn 내부 에러 캐치:", error);
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 20 ? undefined : allPages.length;
    },
    retry: (failureCount, error: any) => {
      if (failureCount >= 3) return false;
      if (error.code === "PGRST116") return false;
      return true;
    },
  });

  const words = useMemo(() => query.data?.pages.flatMap((page) => page) || [], [query.data?.pages]);

  return {
    ...query,
    words,
  };
};
