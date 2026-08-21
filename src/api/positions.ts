import { INTERVIEW_POSITIONS, type InterviewPosition } from "@/content/positions";
import { CONTENT_API_MOCK_ENABLED, fetchContentJson, mockDelay, mockNotFound } from "./contentClient";

export async function fetchPositions(): Promise<InterviewPosition[]> {
  if (CONTENT_API_MOCK_ENABLED) {
    return mockDelay(INTERVIEW_POSITIONS);
  }
  return fetchContentJson<InterviewPosition[]>("/api/v1/content/positions");
}

export async function fetchPositionDetail(id: string): Promise<InterviewPosition> {
  if (CONTENT_API_MOCK_ENABLED) {
    const position = INTERVIEW_POSITIONS.find((p) => p.id === id);
    if (!position) mockNotFound();
    return mockDelay(position);
  }
  return fetchContentJson<InterviewPosition>(`/api/v1/content/positions/${encodeURIComponent(id)}`);
}
