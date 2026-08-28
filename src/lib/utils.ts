import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * `ids` 순서를 보존하면서 `items`에서 해당하는 항목만 골라낸다.
 * (없는 id는 건너뛴다.) 큐레이션된 순서를 유지해야 하는 목록에 사용한다.
 */
export function pickByIds<T extends { id: string }>(items: readonly T[], ids: readonly string[]): T[] {
  return ids.map((id) => items.find((item) => item.id === id)).filter((item): item is T => Boolean(item));
}
