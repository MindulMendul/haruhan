/**
 * 새 화면/컴포넌트를 만들 때 라우트·SEO·E2E 스펙(또는 스토리·유닛테스트)까지
 * 한 번에 생성해서, 테스트가 "나중에 추가"가 아니라 "처음부터 같이" 있도록 한다.
 *
 * 사용법:
 *   pnpm scaffold:page <route-path> "<제목>" "<설명>"
 *   pnpm scaffold:component <ComponentName> ["<설명>"]
 *
 * 예시:
 *   pnpm scaffold:page bookmarks "북마크" "저장한 CS 노트와 문제를 모아봅니다."
 *   pnpm scaffold:page interview/mock "모의 면접" "실제 면접처럼 시간을 재며 연습합니다."
 *   pnpm scaffold:component RatingStars "별점을 입력받는 컴포넌트"
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function toConstName(routePath) {
  return routePath.toUpperCase().replace(/[/-]/g, "_");
}

function toPascalCase(value) {
  return value
    .split(/[/-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function writeFileSafely(filePath, content) {
  if (fs.existsSync(filePath)) {
    fail(`이미 존재하는 파일입니다: ${path.relative(root, filePath)}`);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  + ${path.relative(root, filePath)}`);
}

function insertIntoBlock(content, blockStartMarker, line, filePathForError) {
  const pattern = new RegExp(`(${blockStartMarker}[\\s\\S]*?)\\n\\} as const;`);
  if (!pattern.test(content)) {
    fail(`${filePathForError}에서 "${blockStartMarker}" 블록을 찾지 못했습니다. 수동으로 추가해주세요.`);
  }
  return content.replace(pattern, `$1\n${line}\n} as const;`);
}

function scaffoldPage([routePath, title, description]) {
  if (!routePath || !title || !description) {
    fail('사용법: pnpm scaffold:page <route-path> "<제목>" "<설명>"');
  }
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(routePath)) {
    fail("route-path는 소문자/숫자/하이픈/슬래시만 사용하세요 (예: bookmarks, interview/mock).");
  }

  const constName = toConstName(routePath);
  const pascalName = `${toPascalCase(routePath)}Screen`;
  const routeFile = path.join(root, "src/app", `${routePath}.tsx`);
  const routesFile = path.join(root, "src/constants/routes.ts");
  const seoFile = path.join(root, "src/constants/seo.ts");
  const e2eFile = path.join(root, "e2e", `${routePath.replace(/\//g, "-")}.spec.ts`);

  console.log(`\n▸ 새 화면 스캐폴드: /${routePath} (${constName})\n`);

  // 1) 라우트 상수
  let routesContent = fs.readFileSync(routesFile, "utf8");
  if (routesContent.includes(`${constName}:`)) {
    fail(`ROUTES.${constName}가 이미 있습니다.`);
  }
  routesContent = insertIntoBlock(routesContent, "export const ROUTES = \\{", `  ${constName}: "/${routePath}",`, "routes.ts");
  fs.writeFileSync(routesFile, routesContent, "utf8");
  console.log(`  ~ src/constants/routes.ts  (ROUTES.${constName} 추가)`);

  // 2) SEO 메타데이터
  let seoContent = fs.readFileSync(seoFile, "utf8");
  seoContent = insertIntoBlock(seoContent, "export const SEO_PATHS = \\{", `  ${constName}: ROUTES.${constName},`, "seo.ts");
  const pageSeoEntry = `  ${constName}: {
    title: "${title}",
    description: "${description}",
    path: SEO_PATHS.${constName},
    keywords: ["${title}"],
  },`;
  seoContent = insertIntoBlock(seoContent, "export const PAGE_SEO = \\{", pageSeoEntry, "seo.ts");
  fs.writeFileSync(seoFile, seoContent, "utf8");
  console.log(`  ~ src/constants/seo.ts  (SEO_PATHS/PAGE_SEO.${constName} 추가)`);

  // 3) 라우트 화면 파일
  const pageTemplate = `import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { PAGE_SEO } from "@/constants/seo";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function ${pascalName}() {
  return (
    <>
      <Seo
        title={PAGE_SEO.${constName}.title}
        description={PAGE_SEO.${constName}.description}
        path={PAGE_SEO.${constName}.path}
        keywords={[...PAGE_SEO.${constName}.keywords]}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.${constName}.title,
            description: PAGE_SEO.${constName}.description,
            path: PAGE_SEO.${constName}.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.${constName}.title, path: PAGE_SEO.${constName}.path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: PAGE_SEO.${constName}.title }} />
      <Screen>
        <Section title={PAGE_SEO.${constName}.title} description="${description}">
          <Text className="text-sm leading-6 text-ink-600 dark:text-ink-300">
            TODO: ${pascalName} 화면 내용을 구현하세요.
          </Text>
        </Section>
      </Screen>
    </>
  );
}
`;
  writeFileSafely(routeFile, pageTemplate);

  // 4) E2E 스펙 (처음부터 통과하는 최소 시나리오 — 여기서부터 시나리오를 늘려나간다)
  const e2eTemplate = `import { expect, test } from "./fixtures";

test.describe("${title} (/${routePath})", () => {
  test("화면이 열리고 기본 문구가 보인다", async ({ page }) => {
    await page.goto("/${routePath}");

    await expect(page.getByText("${title}").first()).toBeVisible();
  });

  // TODO: 실제 기능 시나리오를 추가하세요 (버튼 클릭, 폼 제출, 다른 화면으로 이동 등).
});
`;
  writeFileSafely(e2eFile, e2eTemplate);

  console.log(`
다음 단계:
  1. ${path.relative(root, routeFile)} 에 실제 화면을 구현하세요.
  2. 필요하면 src/app/_layout.tsx의 Drawer.Screen 목록에 "${routePath.split("/")[0]}" 항목을 추가하세요.
  3. 하단 Nav Bar에 노출하려면 src/components/navigation/BottomNavBar.tsx의 NAV_ITEMS에 추가하세요.
  4. pnpm test:all 로 확인하세요 (지금 생성된 상태로도 이미 통과합니다).
`);
}

function scaffoldComponent([nameArg, description = "TODO: 컴포넌트 설명을 채워주세요."]) {
  if (!nameArg) {
    fail('사용법: pnpm scaffold:component <ComponentName> ["<설명>"]');
  }
  if (!/^[A-Z][A-Za-z0-9]*$/.test(nameArg)) {
    fail("ComponentName은 PascalCase여야 합니다 (예: RatingStars).");
  }

  const componentFile = path.join(root, "src/components/ui", `${nameArg}.tsx`);
  const storyFile = path.join(root, "src/components/ui", `${nameArg}.stories.tsx`);

  console.log(`\n▸ 새 컴포넌트 스캐폴드: ${nameArg}\n`);

  const componentTemplate = `import { cn } from "@/lib/utils";
import React from "react";
import { Text, View, type ViewProps } from "react-native";

interface ${nameArg}Props extends ViewProps {
  className?: string;
}

// ${description}
export function ${nameArg}({ className, ...props }: ${nameArg}Props) {
  return (
    <View className={cn("rounded-2xl border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-800", className)} {...props}>
      <Text className="text-sm text-ink-700 dark:text-ink-200">TODO: ${nameArg} 구현</Text>
    </View>
  );
}
`;
  writeFileSafely(componentFile, componentTemplate);

  const storyTemplate = `import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { ${nameArg} } from "./${nameArg}";

const meta = {
  title: "UI/${nameArg}",
  component: ${nameArg},
} satisfies Meta<typeof ${nameArg}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
`;
  writeFileSafely(storyFile, storyTemplate);

  console.log(`
다음 단계:
  1. ${path.relative(root, componentFile)} 를 구현하세요.
  2. 필요하면 src/components/ui/index.ts에 export를 추가하세요.
  3. pnpm storybook 으로 확인하세요.
  4. 순수 로직(포맷팅, 계산 등)이 있으면 ${nameArg}.test.ts를 추가하세요.
`);
}

const [, , command, ...args] = process.argv;

if (command === "page") {
  scaffoldPage(args);
} else if (command === "component") {
  scaffoldComponent(args);
} else {
  fail('알 수 없는 명령입니다. "pnpm scaffold:page ..." 또는 "pnpm scaffold:component ..." 를 사용하세요.');
}
