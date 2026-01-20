import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useQueryWord = (dataKey: string) => {
  return useQuery({
    queryKey: [dataKey],
    queryFn: async (): Promise<Word[]> => {
      try {
        const { data, error } = await supabase.from<string, Word>(dataKey).select("*");

        if (error) {
          console.error("에러 발생:", error);
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error("QueryFn 내부 에러 캐치:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error: any) => {
      console.error(failureCount);
      if (failureCount >= 3) return false; // 3번까지만 시도함
      if (error.code === "PGRST116") return false; // 데이터 없음은 처리하지 않음
      return true;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });
};
