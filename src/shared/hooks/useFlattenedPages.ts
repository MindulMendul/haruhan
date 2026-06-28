import { useMemo } from "react";

/**
 * useInfiniteQuery의 페이지 배열(items[][])을 단일 배열로 평탄화하고 메모이즈한다.
 * 무한 스크롤 훅마다 반복되던 flatMap + useMemo 보일러플레이트를 통합한다.
 */
export function useFlattenedPages<TItem>(pages: TItem[][] | undefined): TItem[] {
  return useMemo(() => pages?.flat() ?? [], [pages]);
}
