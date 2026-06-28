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
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "coverage",
      include: [
        "src/shared/lib/**/*.{ts,tsx}",
        "src/shared/config/**/*.{ts,tsx}",
        "src/entities/cs-topic/content/**/*.{ts,tsx}",
        "src/entities/cs-topic/lib/**/*.{ts,tsx}",
      ],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/shared/api/supabase.ts",
        "src/shared/lib/theme.ts",
        "src/shared/config/app.ts",
      ],
    },
  },
});
