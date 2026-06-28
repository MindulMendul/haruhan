import { getSupabase } from "@/shared/api";
import { useFlattenedPages } from "@/shared/hooks/useFlattenedPages";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteWords = (dataKey: string) => {
  const query = useInfiniteQuery({
    queryKey: [dataKey, "infinite"],
    queryFn: async ({ pageParam = 0 }): Promise<Word[]> => {
      const { data, error } = await getSupabase(pageParam, dataKey);
      if (error) {
        // Supabase PostgREST 오류 — 콘솔에 code/message 확인 (테이블명·RLS·환경변수 등)
        console.error(`[useInfiniteWords:${dataKey}]`, error.message ?? error);
        throw error;
      }
      return data || [];
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

  const words = useFlattenedPages<Word>(query.data?.pages);

  return {
    ...query,
    words,
  };
};
