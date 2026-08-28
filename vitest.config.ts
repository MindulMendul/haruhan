import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${fileURLToPath(new URL("./src/", import.meta.url))}/` },
      { find: "react-native", replacement: "react-native-web" },
    ],
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "coverage",
      include: ["src/lib/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/lib/supabase.ts",
        "src/lib/theme.ts",
      ],
      // 회귀 감지용 하한선. 현재 실측치(대략 stmts 95%/branch 87%)보다 살짝 낮게 잡아,
      // 사소한 변동으로 CI가 깨지진 않으면서 큰 커버리지 하락은 잡아낸다.
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 95,
      },
    },
  },
});
