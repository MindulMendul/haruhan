import { fetchCsTopicDetail, fetchCsTopics } from "@/shared/api/csTopics";
import { useQuery } from "@tanstack/react-query";

export function useCsTopics() {
  return useQuery({
    queryKey: ["cs-topics"],
    queryFn: fetchCsTopics,
    staleTime: Infinity,
    retry: false,
  });
}

export function useCsTopicDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["cs-topics", id],
    queryFn: () => fetchCsTopicDetail(id as string),
    enabled: Boolean(id),
    staleTime: Infinity,
    retry: false,
  });
}
