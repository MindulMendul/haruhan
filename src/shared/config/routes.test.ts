import { describe, expect, it } from "vitest";
import { ROUTES, getCsTopicRoute, getJobPositionRoute } from "./routes";

describe("getCsTopicRoute", () => {
  it("CS 상세 경로를 토픽 id로 생성한다", () => {
    expect(getCsTopicRoute("seo")).toBe(`${ROUTES.CS}/seo`);
    expect(getCsTopicRoute("event-loop")).toBe("/cs/event-loop");
  });
});

describe("getJobPositionRoute", () => {
  it("포지션 쿼리 파라미터를 붙인 경로를 생성한다", () => {
    expect(getJobPositionRoute("frontend")).toBe(`${ROUTES.JOB_POSITIONS}?position=frontend`);
    expect(getJobPositionRoute("ai-ml")).toBe("/job-positions?position=ai-ml");
  });
});
