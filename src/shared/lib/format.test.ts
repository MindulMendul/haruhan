import { describe, expect, it } from "vitest";
import { formatDuration, toPercent } from "./format";

describe("toPercent", () => {
  it("0~1 비율을 정수 퍼센트 문자열로 변환한다", () => {
    expect(toPercent(0)).toBe("0%");
    expect(toPercent(1)).toBe("100%");
    expect(toPercent(0.732)).toBe("73%");
  });
});

describe("formatDuration", () => {
  it("초를 m:ss 형식으로 변환한다", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(5)).toBe("0:05");
    expect(formatDuration(65)).toBe("1:05");
    expect(formatDuration(600)).toBe("10:00");
  });

  it("음수나 소수는 0초 이상 정수로 보정한다", () => {
    expect(formatDuration(-10)).toBe("0:00");
    expect(formatDuration(9.9)).toBe("0:09");
  });
});
