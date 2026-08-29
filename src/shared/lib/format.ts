/** 0~1 비율을 정수 퍼센트 문자열로 변환한다. 예) 0.732 → "73%" */
export function toPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

/** 초를 m:ss 형식 문자열로 변환한다. 예) 65 → "1:05" */
export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
