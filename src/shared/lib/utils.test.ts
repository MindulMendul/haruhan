import { describe, expect, it } from "vitest";
import { pickByIds } from "./utils";

describe("pickByIds", () => {
  const items = [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
  ];

  it("items 배열 순서가 아니라 ids 순서대로 골라낸다", () => {
    expect(pickByIds(items, ["c", "a"])).toEqual([
      { id: "c", label: "C" },
      { id: "a", label: "A" },
    ]);
  });

  it("존재하지 않는 id는 건너뛴다", () => {
    expect(pickByIds(items, ["b", "missing"])).toEqual([{ id: "b", label: "B" }]);
  });

  it("ids가 비어 있으면 빈 배열을 반환한다", () => {
    expect(pickByIds(items, [])).toEqual([]);
  });
});
