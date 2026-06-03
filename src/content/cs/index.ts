import type { CsTopicMeta } from "@/types/cs";
import contents from "./contents.json";
import { CS_TOPICS } from "./manifest";

export { CS_TOPICS };

const CS_MARKDOWN = contents as Record<string, string>;

export const CS_PAGE_SIZE = 4;

export const COMMON_CS_TOPIC_IDS = [
  "general-cs-practical-deep-dive",
  "computer-architecture-question-map",
  "os-question-map",
  "data-structure-question-map",
  "algorithm-question-map",
  "security-question-map",
  "cpp-question-map",
  "jit-question-map",
] as const;

const RELATED_TOPIC_IDS: Record<string, string[]> = {
  "critical-render-path": ["csr-ssr", "seo", "web-fe-question-map"],
  seo: ["critical-render-path", "csr-ssr", "web-fe-question-map"],
  "folder-structure-architecture": ["design-pattern-mvc-flux", "state-management", "behavioral-interview-question-map"],
  "design-pattern-mvc-flux": ["state-management", "folder-structure-architecture", "functional-programming-prototype"],
  "csr-ssr": ["critical-render-path", "seo", "web-fe-question-map"],
  "event-loop": ["critical-render-path", "garbage-collection", "web-fe-question-map"],
  "functional-programming-prototype": ["event-loop", "garbage-collection", "design-pattern-mvc-flux"],
  "garbage-collection": ["event-loop", "functional-programming-prototype", "critical-render-path"],
  "state-management": ["design-pattern-mvc-flux", "csr-ssr", "authn-authz"],
  "authn-authz": ["security-question-map", "state-management", "cicd-cdn"],
  "cicd-cdn": ["software-engineering-question-map", "seo", "csr-ssr"],
  "web-fe-question-map": ["critical-render-path", "csr-ssr", "ai-prompt-engineering-practical-interview"],
  "computer-architecture-question-map": ["general-cs-practical-deep-dive", "os-question-map", "jit-question-map"],
  "os-question-map": ["general-cs-practical-deep-dive", "computer-architecture-question-map", "algorithm-question-map"],
  "software-engineering-question-map": ["behavioral-interview-question-map", "folder-structure-architecture", "cicd-cdn"],
  "security-question-map": ["general-cs-practical-deep-dive", "authn-authz", "web-fe-question-map"],
  "data-structure-question-map": ["general-cs-practical-deep-dive", "algorithm-question-map", "os-question-map"],
  "algorithm-question-map": ["general-cs-practical-deep-dive", "data-structure-question-map", "cpp-question-map"],
  "cpp-question-map": ["data-structure-question-map", "computer-architecture-question-map", "algorithm-question-map"],
  "jit-question-map": ["ai-prompt-engineering-practical-interview", "event-loop", "computer-architecture-question-map"],
  "behavioral-interview-question-map": [
    "ai-prompt-engineering-practical-interview",
    "software-engineering-question-map",
    "web-fe-question-map",
  ],
  "general-cs-practical-deep-dive": ["os-question-map", "data-structure-question-map", "security-question-map"],
  "ai-prompt-engineering-practical-interview": [
    "behavioral-interview-question-map",
    "web-fe-question-map",
    "general-cs-practical-deep-dive",
  ],
};

export function getCsMarkdown(id: string): string {
  return CS_MARKDOWN[id] ?? "";
}

export function getTopicById(id: string): CsTopicMeta | undefined {
  return CS_TOPICS.find((t) => t.id === id);
}

export function getTopicsByIds(ids: readonly string[]): CsTopicMeta[] {
  return ids.map(getTopicById).filter((topic): topic is CsTopicMeta => Boolean(topic));
}

export function getRelatedTopics(id: string, limit = 3): CsTopicMeta[] {
  const relatedIds = RELATED_TOPIC_IDS[id] ?? [];
  return relatedIds.map(getTopicById).filter((topic): topic is CsTopicMeta => Boolean(topic)).slice(0, limit);
}

export const COMMON_CS_TOPICS = getTopicsByIds(COMMON_CS_TOPIC_IDS);
