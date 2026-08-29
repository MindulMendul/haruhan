import { describe, expect, it } from "vitest";
import {
  COMMON_CS_TOPICS,
  COMMON_CS_TOPIC_IDS,
  getCsMarkdown,
  getRelatedTopics,
  getTopicById,
  getTopicsByIds,
} from "./index";

describe("getTopicById", () => {
  it("존재하는 토픽을 반환한다", () => {
    const topic = getTopicById("os-question-map");
    expect(topic?.id).toBe("os-question-map");
  });

  it("없는 id는 undefined를 반환한다", () => {
    expect(getTopicById("does-not-exist")).toBeUndefined();
  });
});

describe("getTopicsByIds", () => {
  it("존재하지 않는 id는 결과에서 걸러낸다", () => {
    const topics = getTopicsByIds(["os-question-map", "does-not-exist", "algorithm-question-map"]);
    expect(topics.map((t) => t.id)).toEqual(["os-question-map", "algorithm-question-map"]);
  });
});

describe("getRelatedTopics", () => {
  it("관련 토픽을 limit 개수만큼 반환한다", () => {
    const related = getRelatedTopics("os-question-map", 2);
    expect(related).toHaveLength(2);
    expect(related.every((t) => t.id !== "os-question-map")).toBe(true);
  });

  it("관련 매핑이 없는 id는 빈 배열을 반환한다", () => {
    expect(getRelatedTopics("does-not-exist")).toEqual([]);
  });
});

describe("getCsMarkdown", () => {
  it("없는 id는 빈 문자열을 반환한다", () => {
    expect(getCsMarkdown("does-not-exist")).toBe("");
  });
});

describe("COMMON_CS_TOPICS", () => {
  it("모든 공통 토픽 id가 실제 토픽으로 해석된다", () => {
    expect(COMMON_CS_TOPICS).toHaveLength(COMMON_CS_TOPIC_IDS.length);
  });
});
