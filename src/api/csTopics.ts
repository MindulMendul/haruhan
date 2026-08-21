import { CS_TOPICS, getCsMarkdown } from "@/content/cs";
import type { CsTopicMeta } from "@/types/cs";
import { CONTENT_API_MOCK_ENABLED, fetchContentJson, mockDelay, mockNotFound } from "./contentClient";

export interface CsTopicDetail {
  topic: CsTopicMeta;
  body: string;
}

export async function fetchCsTopics(): Promise<CsTopicMeta[]> {
  if (CONTENT_API_MOCK_ENABLED) {
    return mockDelay(CS_TOPICS);
  }
  return fetchContentJson<CsTopicMeta[]>("/api/v1/content/cs-topics");
}

export async function fetchCsTopicDetail(id: string): Promise<CsTopicDetail> {
  if (CONTENT_API_MOCK_ENABLED) {
    const topic = CS_TOPICS.find((t) => t.id === id);
    if (!topic) mockNotFound();
    return mockDelay({ topic, body: getCsMarkdown(id) });
  }
  return fetchContentJson<CsTopicDetail>(`/api/v1/content/cs-topics/${encodeURIComponent(id)}`);
}
