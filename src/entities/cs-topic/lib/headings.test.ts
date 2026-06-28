import { describe, expect, it } from "vitest";
import { getWikiHeadings } from "./headings";

describe("getWikiHeadings", () => {
  it("## / ### 제목만 추출하고 본문은 무시한다", () => {
    const body = ["# 제목1", "본문 문단", "## 섹션 A", "내용", "### 소항목 1"].join("\n");

    expect(getWikiHeadings(body)).toEqual([
      { id: "1", level: 2, title: "섹션 A" },
      { id: "2", level: 3, title: "소항목 1" },
    ]);
  });

  it("제목 내 마크다운 기호를 제거한다", () => {
    expect(getWikiHeadings("## `코드` **굵게**")).toEqual([{ id: "1", level: 2, title: "코드 굵게" }]);
  });

  it("내용이 없는 제목 줄은 건너뛴다", () => {
    expect(getWikiHeadings("## \n### ##")).toEqual([]);
  });

  it("제목이 없으면 빈 배열을 반환한다", () => {
    expect(getWikiHeadings("본문만 있습니다.\n또 다른 문단")).toEqual([]);
  });
});
