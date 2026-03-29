import type { CsTopicMeta } from "@/types/cs";
import contents from "./contents.json";
import { CS_TOPICS } from "./manifest";

export { CS_TOPICS };

const CS_MARKDOWN = contents as Record<string, string>;

export const CS_PAGE_SIZE = 4;

export function getCsMarkdown(id: string): string {
  return CS_MARKDOWN[id] ?? "";
}

export function getTopicById(id: string): CsTopicMeta | undefined {
  return CS_TOPICS.find((t) => t.id === id);
}
