export const ROUTES = {
  HOME: "/",
  CS: "/cs",
  INTERVIEW: "/interview",
  INTERVIEW_PRACTICE: "/interview/practice",
  INTERVIEW_ANALYSIS: "/interview/analysis",
  INTERVIEW_VOICE: "/interview/voice",
  JOB_POSITIONS: "/job-positions",
  NETWORK: "/network",
  SETTINGS: "/settings",
  FEEDBACK: "/feedback",
  PRIVACY: "/privacy",
  NOT_FOUND: "/404",
} as const;

export function getCsTopicRoute(topicId: string) {
  return `${ROUTES.CS}/${topicId}` as const;
}

export function getJobPositionRoute(positionId: string) {
  return `${ROUTES.JOB_POSITIONS}?position=${positionId}` as const;
}
