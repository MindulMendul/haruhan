/// <reference types="cypress" />

describe("하루한 스모크 E2E", () => {
  it("홈 화면 핵심 요소가 렌더링된다", () => {
    cy.visit("/");
    cy.contains("면접 준비를 더 간결하게").should("be.visible");
    cy.contains("설정 열기").should("be.visible");
  });

  it("주요 내비게이션 항목이 모두 표시된다", () => {
    cy.visit("/");
    ["공부", "문제", "복기", "면접"].forEach((label) => {
      cy.contains(label).should("exist");
    });
  });

  it("홈에서 설정 화면으로 이동한다", () => {
    cy.visit("/");
    cy.contains("설정 열기").click();
    cy.location("pathname").should("include", "/settings");
  });

  it("CS(공부) 화면을 직접 열 수 있다", () => {
    cy.visit("/cs");
    cy.location("pathname").should("include", "/cs");
  });
});
