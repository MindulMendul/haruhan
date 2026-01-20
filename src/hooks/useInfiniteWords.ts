import { supabase } from "@/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useInfiniteWords = (dataKey: string) => {
  const query = useInfiniteQuery({
    queryKey: [dataKey, "infinite"],
    queryFn: async ({ pageParam = 0 }): Promise<Word[]> => {
      const ITEMS_PER_PAGE = 20;
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        const { data, error } = await supabase
          .from<string, Word>(dataKey)
          .select("*")
          .range(from, to)
          .order("id", { ascending: true });
        console.log(data);

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
