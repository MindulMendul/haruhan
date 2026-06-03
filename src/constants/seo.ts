import { ROUTES } from "./routes";

export const SITE_NAME = "하루한";
export const SITE_ORIGIN = "https://haruhan.vercel.app";
export const DEFAULT_SEO_TITLE = "하루한 - 면접용 CS를 정리하는 시간";
export const DEFAULT_SEO_DESCRIPTION =
  "공통 CS 개념과 포지션별 면접 질문을 한 번에 정리하는 개발자 면접 준비 도구입니다.";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/haruhan-logo.png`;

export const SEO_ROBOTS = {
  INDEX: "index, follow",
  NO_INDEX: "noindex, nofollow",
} as const;

export const SEO_PATHS = {
  HOME: ROUTES.HOME,
  CS: ROUTES.CS,
  JOB_POSITIONS: ROUTES.JOB_POSITIONS,
  NETWORK: ROUTES.NETWORK,
  SETTINGS: ROUTES.SETTINGS,
  FEEDBACK: ROUTES.FEEDBACK,
  NOT_FOUND: ROUTES.NOT_FOUND,
} as const;

export const PAGE_SEO = {
  HOME: {
    title: SITE_NAME,
    description: "공통 CS 개념과 포지션별 면접 질문을 하루에 하나씩 정리하는 개발자 면접 준비 도구입니다.",
    path: SEO_PATHS.HOME,
    keywords: ["개발자 면접", "CS 면접", "IT 면접", "포지션별 면접", "하루한"],
  },
  CS_INDEX: {
    title: "공통 CS 면접 노트",
    description: "네트워크, 운영체제, 자료구조, 알고리즘, 보안처럼 개발자 면접에서 공통으로 묻는 CS 개념을 정리합니다.",
    path: SEO_PATHS.CS,
    keywords: ["CS 면접", "개발자 면접", "운영체제", "자료구조", "알고리즘", "보안"],
  },
  JOB_POSITIONS: {
    title: "JD 포지션",
    description: "포지션별 개발자 면접 질문과 함께 이어서 보면 좋은 CS 노트를 정리합니다.",
    path: SEO_PATHS.JOB_POSITIONS,
    keywords: ["개발자 면접", "포지션별 면접"],
  },
  NETWORK: {
    title: "네트워크 용어",
    description: "네트워크 면접과 개발 실무에서 자주 만나는 핵심 용어를 카드 형태로 정리합니다.",
    path: SEO_PATHS.NETWORK,
    keywords: ["네트워크", "CS 면접", "개발자 면접", "네트워크 용어"],
  },
  SETTINGS: {
    title: "설정",
    description: "하루한 앱의 테마와 탐색 방식을 조정하는 설정 화면입니다.",
    path: SEO_PATHS.SETTINGS,
  },
  FEEDBACK: {
    title: "Feedback UI",
    description: "하루한 앱에서 사용하는 Toast, Alert, Modal 컴포넌트를 확인하는 개발용 UI 데모 화면입니다.",
    path: SEO_PATHS.FEEDBACK,
  },
  NOT_FOUND: {
    title: "페이지를 찾을 수 없습니다",
    description: "요청한 하루한 페이지를 찾을 수 없습니다.",
    path: SEO_PATHS.NOT_FOUND,
  },
} as const;
