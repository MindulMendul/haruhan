import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // expo start -p web 기본 포트(8081). CI 등에선 CYPRESS_BASE_URL로 덮어쓴다.
    baseUrl: process.env.CYPRESS_BASE_URL ?? "http://localhost:8081",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    video: false,
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
