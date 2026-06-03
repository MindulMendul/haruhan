import React from "react";
import { Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useColorScheme } from "nativewind";

type WikiHeading = {
  id: string;
  level: number;
  title: string;
};

interface WikiMarkdownProps {
  body: string;
  compact?: boolean;
  showToc?: boolean;
}

function cleanHeading(value: string) {
  return value.replace(/[#*_`]/g, "").trim();
}

export function getWikiHeadings(body: string): WikiHeading[] {
  return body
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match, index) => ({
      id: `${index + 1}`,
      level: match[1].length,
      title: cleanHeading(match[2]),
    }));
}

const baseMarkdownStyles = {
  body: {
    color: "#202124",
    fontSize: 15,
    lineHeight: 25,
  },
  heading1: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800" as const,
    lineHeight: 32,
    paddingBottom: 10,
    marginTop: 2,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d7dbe3",
  },
  heading2: {
    color: "#111827",
    fontSize: 19,
    fontWeight: "800" as const,
    lineHeight: 27,
    paddingLeft: 10,
    paddingBottom: 7,
    marginTop: 22,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#2f7fd3",
    borderBottomWidth: 1,
    borderBottomColor: "#d7dbe3",
  },
  heading3: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "700" as const,
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 11,
  },
  strong: {
    color: "#0f3f7a",
    fontWeight: "800" as const,
  },
  em: {
    color: "#475569",
    fontStyle: "italic" as const,
  },
  bullet_list: {
    marginTop: 2,
    marginBottom: 10,
  },
  ordered_list: {
    marginTop: 2,
    marginBottom: 10,
  },
  list_item: {
    marginBottom: 4,
  },
  blockquote: {
    backgroundColor: "#f7f8fa",
    borderLeftColor: "#a8b3c5",
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 10,
  },
  code_inline: {
    backgroundColor: "#eef2f7",
    borderColor: "#d5dbe5",
    borderWidth: 1,
    borderRadius: 4,
    color: "#1f2937",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  fence: {
    backgroundColor: "#f5f6f8",
    borderColor: "#d7dbe3",
    borderWidth: 1,
    borderRadius: 8,
    color: "#111827",
    padding: 12,
    marginVertical: 10,
  },
  hr: {
    backgroundColor: "#d7dbe3",
    height: 1,
    marginVertical: 18,
  },
  table: {
    borderColor: "#ccd3dd",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 12,
  },
  thead: {
    backgroundColor: "#eef3f8",
  },
  th: {
    color: "#111827",
    fontWeight: "800" as const,
    padding: 8,
  },
  tr: {
    borderBottomColor: "#e3e7ee",
    borderBottomWidth: 1,
  },
  td: {
    padding: 8,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline" as const,
  },
};

const compactMarkdownStyles = {
  ...baseMarkdownStyles,
  body: {
    ...baseMarkdownStyles.body,
    fontSize: 14,
    lineHeight: 23,
  },
  heading1: {
    ...baseMarkdownStyles.heading1,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 10,
  },
  heading2: {
    ...baseMarkdownStyles.heading2,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    ...baseMarkdownStyles.heading3,
    fontSize: 15,
    lineHeight: 22,
  },
  paragraph: {
    ...baseMarkdownStyles.paragraph,
    marginBottom: 8,
  },
};

const darkMarkdownStyles = {
  ...baseMarkdownStyles,
  body: {
    ...baseMarkdownStyles.body,
    color: "#e2e8f0",
  },
  heading1: {
    ...baseMarkdownStyles.heading1,
    color: "#f8fafc",
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  heading2: {
    ...baseMarkdownStyles.heading2,
    color: "#f8fafc",
    borderLeftColor: "#8bbcff",
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  heading3: {
    ...baseMarkdownStyles.heading3,
    color: "#f1f5f9",
  },
  strong: {
    ...baseMarkdownStyles.strong,
    color: "#b8d6ff",
  },
  em: {
    ...baseMarkdownStyles.em,
    color: "#cbd5e1",
  },
  blockquote: {
    ...baseMarkdownStyles.blockquote,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderLeftColor: "#94a3b8",
  },
  code_inline: {
    ...baseMarkdownStyles.code_inline,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.12)",
    color: "#f8fafc",
  },
  fence: {
    ...baseMarkdownStyles.fence,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.12)",
    color: "#f8fafc",
  },
  hr: {
    ...baseMarkdownStyles.hr,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  table: {
    ...baseMarkdownStyles.table,
    borderColor: "rgba(255,255,255,0.14)",
  },
  thead: {
    ...baseMarkdownStyles.thead,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  th: {
    ...baseMarkdownStyles.th,
    color: "#f8fafc",
  },
  tr: {
    ...baseMarkdownStyles.tr,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  td: {
    ...baseMarkdownStyles.td,
    color: "#e2e8f0",
  },
  link: {
    ...baseMarkdownStyles.link,
    color: "#8bbcff",
  },
};

const compactDarkMarkdownStyles = {
  ...darkMarkdownStyles,
  body: {
    ...darkMarkdownStyles.body,
    fontSize: 14,
    lineHeight: 23,
  },
  heading1: {
    ...darkMarkdownStyles.heading1,
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 10,
  },
  heading2: {
    ...darkMarkdownStyles.heading2,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    ...darkMarkdownStyles.heading3,
    fontSize: 15,
    lineHeight: 22,
  },
  paragraph: {
    ...darkMarkdownStyles.paragraph,
    marginBottom: 8,
  },
};

function WikiToc({ headings }: { headings: WikiHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <View className="mb-4 overflow-hidden rounded-xl border border-ink-200 bg-ink-50 dark:border-ink-700 dark:bg-ink-800">
      <View className="border-b border-ink-200 bg-ink-100 px-4 py-2 dark:border-ink-700 dark:bg-ink-700">
        <Text className="text-sm font-extrabold text-ink-900 dark:text-white">목차</Text>
      </View>
      <View className="px-4 py-3">
        {headings.map((heading) => (
          <Text
            key={`${heading.id}-${heading.title}`}
            className={`text-[13px] leading-6 text-brand-700 dark:text-brand-200 ${heading.level === 3 ? "ml-4" : ""}`}
          >
            {heading.id}. {heading.title}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function WikiMarkdown({ body, compact = false, showToc = false }: WikiMarkdownProps) {
  const { colorScheme } = useColorScheme();
  const headings = showToc ? getWikiHeadings(body) : [];
  const markdownStyle =
    colorScheme === "dark"
      ? compact
        ? compactDarkMarkdownStyles
        : darkMarkdownStyles
      : compact
        ? compactMarkdownStyles
        : baseMarkdownStyles;

  return (
    <View>
      {showToc ? <WikiToc headings={headings} /> : null}
      <Markdown style={markdownStyle}>{body}</Markdown>
    </View>
  );
}

