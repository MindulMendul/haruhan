import { fetchPositionDetail, fetchPositions } from "@/shared/api/positions";
import { useQuery } from "@tanstack/react-query";

export function usePositions() {
  return useQuery({
    queryKey: ["positions"],
    queryFn: fetchPositions,
    staleTime: Infinity,
    retry: false,
  });
}

export function usePositionDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["positions", id],
    queryFn: () => fetchPositionDetail(id as string),
    enabled: Boolean(id),
    staleTime: Infinity,
    retry: false,
  });
}
