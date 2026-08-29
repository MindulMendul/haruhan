import { describe, expect, it } from "vitest";
import { clamp, clamp01, consistencyScore, mean } from "./stats";

describe("clamp", () => {
  it("값을 [min, max] 범위로 제한한다", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});

describe("clamp01", () => {
  it("값을 0~1 범위로 제한한다", () => {
    expect(clamp01(0.5)).toBe(0.5);
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(2)).toBe(1);
  });
});

describe("mean", () => {
  it("산술 평균을 계산한다", () => {
    expect(mean([2, 4, 6])).toBe(4);
  });

  it("빈 배열이면 0을 반환한다", () => {
    expect(mean([])).toBe(0);
  });
});

describe("consistencyScore", () => {
  it("값이 없으면 0", () => {
    expect(consistencyScore([])).toBe(0);
  });

  it("값이 1개이면 1", () => {
    expect(consistencyScore([10])).toBe(1);
  });

  it("모든 값이 같으면 1(완전 일관)", () => {
    expect(consistencyScore([20, 20, 20])).toBe(1);
  });

  it("모든 값이 0이면 1", () => {
    expect(consistencyScore([0, 0])).toBe(1);
  });

  it("변동이 클수록 낮은 점수를 준다", () => {
    const stable = consistencyScore([10, 11, 9, 10]);
    const volatile = consistencyScore([2, 40, 5, 30]);
    expect(stable).toBeGreaterThan(volatile);
    expect(stable).toBeLessThanOrEqual(1);
    expect(volatile).toBeGreaterThanOrEqual(0);
  });
});
