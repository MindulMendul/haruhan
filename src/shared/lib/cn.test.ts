import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("truthy class names만 공백으로 이어 붙인다", () => {
    expect(cn("base", false, "active", null, undefined, "dark")).toBe("base active dark");
  });

  it("모든 값이 falsy이면 빈 문자열을 반환한다", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
