/** 값을 [min, max] 범위로 제한한다. */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** 값을 0~1 범위로 제한한다. */
export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

/** 산술 평균. 빈 배열이면 0. */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * 일관성 점수(0~1). 변동계수(표준편차/평균)가 작을수록 1에 가깝다.
 * - 값이 없으면 0
 * - 값이 1개이거나 모든 값이 같으면 1(완전 일관)
 */
export function consistencyScore(values: number[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return 1;

  const avg = mean(values);
  if (avg <= 0) return 1;

  const variance = values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length;
  const coefficientOfVariation = Math.sqrt(variance) / avg;
  return clamp01(1 - coefficientOfVariation);
}
