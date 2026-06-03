import { describe, expect, it } from "vitest";
import { matchesSearchQuery } from "./search";

const networkTopic = {
  title: "Network",
  subtitle: "TCP/IP와 HTTP",
  cardSummary: "패킷, 라우팅, 커넥션 흐름",
  body: "브라우저가 서버와 통신하는 과정을 설명합니다.",
};

describe("matchesSearchQuery", () => {
  it("빈 검색어는 모든 항목을 통과시킨다", () => {
    expect(matchesSearchQuery(networkTopic, "   ")).toBe(true);
  });

  it("대소문자와 공백 차이를 무시하고 검색한다", () => {
    expect(matchesSearchQuery(networkTopic, "tcp/ip")).toBe(true);
    expect(matchesSearchQuery(networkTopic, "NETWORK")).toBe(true);
  });

  it("한글 초성으로도 검색할 수 있다", () => {
    expect(matchesSearchQuery({ title: "운영체제" }, "ㅇㅇㅊㅈ")).toBe(true);
  });

  it("영문 자판으로 입력한 한글 검색어를 보정한다", () => {
    expect(matchesSearchQuery({ title: "운영체제" }, "dnsdudcpwp")).toBe(true);
  });

  it("관련 없는 검색어는 제외한다", () => {
    expect(matchesSearchQuery(networkTopic, "database")).toBe(false);
  });
});
