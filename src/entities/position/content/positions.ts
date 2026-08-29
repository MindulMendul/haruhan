import interviewQuestionsData from "./interviewQuestions.json";

export interface InterviewPosition {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  summary: string;
  keywords: string[];
  focusAreas: string[];
  questions: string[];
  mcq?: { question: string; options: string[]; answerIndex: number }[];
  conceptGroups?: InterviewPositionConceptGroup[];
  topicIds?: string[];
}

// 포지션별 "대표 질문" 100선. 지면을 차지하는 컴포넌트 로직과 분리해 데이터만
// 별도로 관리하기 위해 JSON으로 뺐다 (src/content/cs의 contents.json과 같은 패턴).
const INTERVIEW_QUESTIONS = interviewQuestionsData as Record<string, string[]>;

export interface InterviewPositionConcept {
  term: string;
  summary: string;
  answerHint?: string;
  topicId?: string;
}

export interface InterviewPositionConceptGroup {
  title: string;
  description: string;
  concepts: InterviewPositionConcept[];
}

const BASE_INTERVIEW_POSITIONS: Omit<InterviewPosition, "questions" | "conceptGroups">[] = [
  {
    id: "fe",
    label: "FE",
    title: "Frontend Engineer",
    subtitle: "브라우저와 사용자 경험을 제품으로 구현하는 역할",
    summary: "React/Next.js, 브라우저 동작 원리, 렌더링 성능, 접근성, 상태 관리, 디자인 시스템 질문이 자주 나옵니다.",
    keywords: ["React", "Next.js", "브라우저", "성능", "상태관리", "접근성"],
    focusAreas: [
      "CSR/SSR/SSG/ISR의 차이와 선택 기준",
      "Critical Rendering Path, Reflow/Repaint, Web Vitals",
      "상태 관리 범위와 서버 상태/클라이언트 상태 구분",
      "컴포넌트 설계, 디자인 시스템, 테스트 전략",
    ],
    topicIds: [
      "web-fe-question-map",
      "critical-render-path",
      "csr-ssr",
      "seo",
      "state-management",
      "event-loop",
      "functional-programming-prototype",
      "garbage-collection",
      "authn-authz",
      "design-pattern-mvc-flux",
      "folder-structure-architecture",
      "cicd-cdn",
    ],
    mcq: [
      {
        question: "LCP를 개선하기 위해 먼저 확인해야 할 항목은 무엇인가요?",
        options: [
          "이미지 최적화 및 사이즈 조정",
          "서버 로그 로테이션 설정",
          "데이터베이스 인덱스 재구성",
          "사용자 인증 토큰 만료 시간",
        ],
        answerIndex: 0,
      },
      {
        question: "CSR 대신 SSR을 선택할 타당한 이유는 무엇인가요?",
        options: [
          "초기 랜더링 성능과 SEO 개선이 필요할 때",
          "프론트엔드 번들 크기를 늘리기 위해",
          "클라이언트에서 상태를 전부 관리하기 위해",
          "브라우저의 JavaScript를 완전히 비활성화하기 위해",
        ],
        answerIndex: 0,
      },
      {
        question: "React 컴포넌트에서 useMemo를 사용하는 주된 목적은 무엇인가요?",
        options: [
          "스타일을 적용하기 위해",
          "계산된 값을 메모이제이션하여 성능을 개선하기 위해",
          "라우터를 구성하기 위해",
          "컴포넌트가 렌더링되지 않도록 하기 위해",
        ],
        answerIndex: 1,
      },
      {
        question: "웹 애플리케이션의 렌더링 속도를 올리기 위해 가장 먼저 확인할 것은 무엇인가요?",
        options: [
          "서버 로그 파일 크기",
          "Critical Rendering Path와 리소스 로딩 순서",
          "데이터베이스 쿼리 실행 시간",
          "사용자 세션 만료 시간",
        ],
        answerIndex: 1,
      },
      {
        question: "상태 관리 라이브러리를 도입할 때 가장 중요한 기준은 무엇인가요?",
        options: ["스타일시트 크기", "상태 공유 범위와 복잡도", "API 호출 수", "서버 CPU 사용량"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "be",
    label: "BE",
    title: "Backend Engineer",
    subtitle: "도메인 로직, 데이터, API, 트래픽을 책임지는 역할",
    summary: "API 설계, DB 트랜잭션, 인증/인가, 캐시, 메시지 큐, 장애 대응과 확장성 질문이 핵심입니다.",
    keywords: ["API", "DB", "트랜잭션", "캐시", "인증/인가", "메시지 큐"],
    focusAreas: [
      "REST/GraphQL/gRPC 등 API 설계 방식",
      "트랜잭션 격리 수준, 인덱스, 쿼리 튜닝",
      "캐시 전략과 정합성 문제",
      "비동기 처리, 메시지 큐, 재시도/멱등성",
    ],
    topicIds: ["general-cs-practical-deep-dive", "security-question-map", "authn-authz", "data-structure-question-map"],
    mcq: [
      {
        question: "API에서 멱등성이 중요한 경우는 언제인가요?",
        options: [
          "결제과정 같은 요청이 중복 수신될 수 있는 경우",
          "순수 읽기전용 리소스를 조회할 때",
          "로그를 단순히 수집할 때",
          "정적 파일을 제공할 때",
        ],
        answerIndex: 0,
      },
      {
        question: "데이터베이스 인덱스가 항상 성능을 향상시키지 않는 이유는?",
        options: [
          "인덱스 유지에 쓰기 비용이 추가되기 때문에",
          "쿼리 결과가 항상 정렬되기 때문에",
          "트랜잭션 격리 수준 때문에",
          "네트워크 지연시간 때문에",
        ],
        answerIndex: 0,
      },
      {
        question: "캐시를 사용할 때 일관성을 유지하려면 어떤 요소를 먼저 고려해야 하나요?",
        options: ["데이터 만료 정책과 갱신 전략", "클라이언트 화면 크기", "로그 출력 형식", "서버 메모리 주소"],
        answerIndex: 0,
      },
      {
        question: "트랜잭션 격리 수준이 높으면 어떤 효과가 있나요?",
        options: [
          "동시성 제어가 강화되지만 성능 저하가 있을 수 있다",
          "모든 쿼리가 캐시된다",
          "데이터베이스 백업 시간이 짧아진다",
          "응답 본문이 암호화된다",
        ],
        answerIndex: 0,
      },
      {
        question: "JWT와 세션 기반 인증의 차이로 올바른 것은?",
        options: [
          "JWT는 상태 비저장 인증이고, 세션은 서버에 상태를 유지한다",
          "JWT는 항상 안전하고, 세션은 안전하지 않다",
          "세션은 API 전용이고 JWT는 웹 전용이다",
          "JWT는 데이터베이스 없이 작동하지 않는다",
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "fullstack",
    label: "Fullstack",
    title: "Fullstack Engineer",
    subtitle: "제품 요구사항을 FE부터 BE까지 빠르게 연결하는 역할",
    summary: "화면, API, DB, 배포 흐름을 넘나들며 제품 개발 속도와 경계 설계를 설명할 수 있어야 합니다.",
    keywords: ["제품개발", "FE/BE", "API", "DB", "배포", "아키텍처"],
    focusAreas: [
      "프론트와 백엔드 책임 경계",
      "MVP 개발과 기술 부채 관리",
      "인증/인가 흐름 전체 설계",
      "DB 스키마와 화면 상태의 연결",
    ],
    topicIds: ["web-fe-question-map", "general-cs-practical-deep-dive", "authn-authz", "cicd-cdn"],
    mcq: [
      {
        question: "FE와 BE의 책임 경계로 가장 적절한 것은?",
        options: [
          "모든 검증은 FE에서만 처리한다",
          "BE가 화면 렌더링까지 담당한다",
          "권한·정합성 최종 검증은 BE, UI 상태와 사용자 흐름은 FE가 담당한다",
          "FE가 DB 트랜잭션을 직접 제어한다",
        ],
        answerIndex: 2,
      },
      {
        question: "MVP를 빠르게 출시할 때 합리적인 전략은?",
        options: [
          "핵심 가치 검증에 집중하고 기술 부채를 의도적으로 기록·관리한다",
          "처음부터 모든 엣지 케이스를 구현한다",
          "테스트를 전부 생략한다",
          "모든 기능을 마이크로서비스로 분리한다",
        ],
        answerIndex: 0,
      },
      {
        question: "API 계약(contract)을 먼저 합의하면 좋은 이유는?",
        options: [
          "서버 비용이 줄어들어서",
          "FE/BE가 병렬로 개발하고 통합 비용을 줄일 수 있어서",
          "DB 인덱스가 자동 생성돼서",
          "번들 크기가 작아져서",
        ],
        answerIndex: 1,
      },
      {
        question: "기술 부채를 갚을 우선순위 기준으로 적절한 것은?",
        options: ["코드 줄 수", "파일 이름 길이", "커밋 횟수", "변경 빈도와 장애 위험, 사용자 영향"],
        answerIndex: 3,
      },
      {
        question: "기능 하나를 처음부터 배포까지 설계할 때 놓치기 쉬운 단계는?",
        options: ["모니터링·롤백 같은 운영 관점", "버튼 색상 결정", "변수명 컨벤션", "로고 위치"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "Mobile Engineer",
    subtitle: "iOS/Android 앱의 생명주기, 성능, 배포를 다루는 역할",
    summary:
      "앱 생명주기, 네이티브 권한, 스토어 배포, 오프라인 처리, React Native/Flutter/Native 성능 질문이 나옵니다.",
    keywords: ["iOS", "Android", "React Native", "권한", "스토어", "오프라인"],
    focusAreas: [
      "앱 생명주기와 백그라운드 동작",
      "권한 요청 UX와 플랫폼 정책",
      "네이티브 브릿지/렌더링 성능",
      "스토어 배포, 버전 코드, 크래시 리포팅",
    ],
    topicIds: ["general-cs-practical-deep-dive", "authn-authz", "security-question-map"],
    mcq: [
      {
        question: "앱 권한 요청 시점으로 가장 좋은 것은?",
        options: [
          "앱을 처음 켜자마자 모든 권한을 한 번에 요청한다",
          "기능을 실제로 사용하는 직전에 맥락과 함께 요청한다",
          "앱 삭제 직전에 요청한다",
          "권한 없이 강제로 기능을 실행한다",
        ],
        answerIndex: 1,
      },
      {
        question: "React Native에서 성능 병목을 찾는 합리적인 방법은?",
        options: [
          "프로파일러로 렌더링/브릿지 비용을 측정한다",
          "콘솔 로그만 보고 추측한다",
          "무조건 네이티브로 재작성한다",
          "이미지를 모두 제거한다",
        ],
        answerIndex: 0,
      },
      {
        question: "오프라인 상태에서 데이터를 다루는 적절한 전략은?",
        options: [
          "오프라인이면 앱을 종료한다",
          "모든 데이터를 매번 서버에서만 읽는다",
          "로컬 캐시와 쓰기 큐를 두고 복귀 시 동기화한다",
          "데이터를 저장하지 않는다",
        ],
        answerIndex: 2,
      },
      {
        question: "스토어 배포 시 버전 관리로 올바른 것은?",
        options: [
          "배포마다 versionCode를 증가시켜 충돌을 막는다",
          "항상 같은 versionCode를 사용한다",
          "버전을 내려서 업로드한다",
          "버전을 비워둔다",
        ],
        answerIndex: 0,
      },
      {
        question: "앱이 background로 전환될 때 고려할 점은?",
        options: ["화면 색을 변경한다", "앱 아이콘을 교체한다", "사용자 비밀번호를 변경한다", "진행 중 작업 저장과 네트워크/타이머 정리"],
        answerIndex: 3,
      },
    ],
  },
  {
    id: "infra",
    label: "Infra",
    title: "Infra / Platform Engineer",
    subtitle: "서비스가 돌아갈 기반과 개발자 플랫폼을 만드는 역할",
    summary: "클라우드, 네트워크, Kubernetes, IaC, CI/CD, 운영 자동화와 비용 최적화 질문이 많습니다.",
    keywords: ["Cloud", "Kubernetes", "IaC", "Network", "CI/CD", "Cost"],
    focusAreas: [
      "VPC, Subnet, Load Balancer, DNS 설계",
      "Kubernetes 배포/스케일링/리소스 제한",
      "Terraform 같은 IaC와 변경 관리",
      "개발자 경험과 셀프서비스 플랫폼",
    ],
    topicIds: ["os-question-map", "general-cs-practical-deep-dive", "cicd-cdn", "security-question-map"],
    mcq: [
      {
        question: "Kubernetes에서 Deployment의 주된 역할은?",
        options: [
          "원하는 수의 Pod 상태를 유지하고 롤링 업데이트를 관리한다",
          "DNS 레코드를 생성한다",
          "TLS 인증서를 발급한다",
          "로그를 수집한다",
        ],
        answerIndex: 0,
      },
      {
        question: "Service(또는 Ingress)가 담당하는 것은?",
        options: [
          "컨테이너 이미지를 빌드한다",
          "Pod에 대한 안정적인 네트워크 엔드포인트를 제공한다",
          "소스 코드를 컴파일한다",
          "DB를 백업한다",
        ],
        answerIndex: 1,
      },
      {
        question: "Blue-Green과 Canary 배포의 차이로 옳은 것은?",
        options: [
          "둘은 완전히 동일하다",
          "Blue-Green은 트래픽을 1%씩 보낸다",
          "Canary는 일부 트래픽에 점진 노출, Blue-Green은 환경 전체를 전환한다",
          "Canary는 롤백이 불가능하다",
        ],
        answerIndex: 2,
      },
      {
        question: "Terraform state가 중요한 이유는?",
        options: [
          "실제 인프라와 코드의 매핑을 추적하기 때문에",
          "로그를 저장하기 때문에",
          "컨테이너를 실행하기 때문에",
          "DNS를 캐싱하기 때문에",
        ],
        answerIndex: 0,
      },
      {
        question: "private subnet의 리소스를 인터넷에 직접 노출하지 않는 이유는?",
        options: ["비용이 더 들기 때문에", "DNS가 동작하지 않아서", "IP가 부족해서", "공격 표면을 줄이고 접근을 통제하기 위해"],
        answerIndex: 3,
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    title: "DevOps Engineer",
    subtitle: "개발과 운영의 흐름을 자동화하고 피드백 루프를 줄이는 역할",
    summary: "CI/CD, 배포 전략, 모니터링, 자동화, 운영 문화와 개발 생산성 질문이 중심입니다.",
    keywords: ["CI/CD", "자동화", "배포", "모니터링", "DevEx", "운영문화"],
    focusAreas: [
      "빌드/테스트/배포 파이프라인 구성",
      "롤백 가능한 배포 전략",
      "로그/메트릭/트레이싱 기반 관측성",
      "운영 반복 작업 자동화",
    ],
    topicIds: [
      "cicd-cdn",
      "software-engineering-question-map",
      "general-cs-practical-deep-dive",
      "security-question-map",
    ],
    mcq: [
      {
        question: "좋은 CI/CD 파이프라인에 일반적으로 포함되는 단계는?",
        options: [
          "lint·test·build·배포·스모크 테스트 자동화",
          "수동 FTP 업로드",
          "배포 후 테스트 생략",
          "빌드 없이 소스 직접 복사",
        ],
        answerIndex: 0,
      },
      {
        question: "롤백 가능한 배포 전략으로 적절한 것은?",
        options: [
          "DB를 매번 새로 생성한다",
          "이전 버전을 즉시 되돌릴 수 있는 무중단 배포 + 버전 보관",
          "배포 후 백업을 삭제한다",
          "수동으로 서버 파일을 교체한다",
        ],
        answerIndex: 1,
      },
      {
        question: "관측성(Observability)을 구성하는 세 가지 축은?",
        options: ["로그·메트릭·트레이스", "CPU·RAM·디스크", "HTML·CSS·JS", "FE·BE·DB"],
        answerIndex: 0,
      },
      {
        question: "배포 자동화를 도입할 때 주의할 점은?",
        options: [
          "테스트를 모두 끈다",
          "권한을 모두에게 부여한다",
          "실패 시 멈춤 지점과 알림·롤백을 함께 설계한다",
          "로그를 남기지 않는다",
        ],
        answerIndex: 2,
      },
      {
        question: "DevOps와 SRE의 관계로 적절한 설명은?",
        options: [
          "SRE는 신뢰성을 지표로 운영하는 구체적 구현 방식 중 하나다",
          "둘은 서로 무관하다",
          "DevOps는 보안만 담당한다",
          "SRE는 프론트엔드 전담이다",
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "sre",
    label: "SRE",
    title: "Site Reliability Engineer",
    subtitle: "서비스 신뢰성과 장애 대응 체계를 수치로 관리하는 역할",
    summary: "SLO/SLI/SLA, 에러 버짓, 온콜, 장애 회고, 용량 계획, 관측성 질문이 핵심입니다.",
    keywords: ["SLO", "SLI", "SLA", "Error Budget", "On-call", "Observability"],
    focusAreas: [
      "SLO/SLI/SLA 정의와 에러 버짓 운영",
      "장애 탐지, 대응, 회고 프로세스",
      "트래픽 증가에 대비한 용량 계획",
      "Toil 제거와 운영 자동화",
    ],
    topicIds: ["general-cs-practical-deep-dive", "os-question-map", "cicd-cdn"],
    mcq: [
      {
        question: "SLO와 SLA의 차이로 옳은 것은?",
        options: [
          "SLO는 내부 목표, SLA는 외부 약속과 보상 조건이다",
          "SLO가 법적 계약이다",
          "둘은 동일하다",
          "SLA는 측정 지표 그 자체다",
        ],
        answerIndex: 0,
      },
      {
        question: "Error Budget의 역할은?",
        options: [
          "서버 비용 예산이다",
          "허용 실패량을 정해 개발 속도와 안정성의 균형을 잡는다",
          "광고 예산이다",
          "테스트 커버리지 목표다",
        ],
        answerIndex: 1,
      },
      {
        question: "장애 대응(Incident Response)에서 우선순위가 높은 것은?",
        options: ["영향 완화와 사용자 영향 최소화", "보고서 양식 정리", "비난 대상 찾기", "코드 리팩터링"],
        answerIndex: 0,
      },
      {
        question: "알람 피로(alert fatigue)를 줄이는 방법은?",
        options: [
          "모든 지표에 알람을 설정한다",
          "알람을 모두 끈다",
          "임계값을 0으로 설정한다",
          "실행 가능하고 증상 기반인 알람만 남긴다",
        ],
        answerIndex: 3,
      },
      {
        question: "SLI로 적절한 예시는?",
        options: ["성공 요청 비율, p99 지연 시간", "직원 수", "코드 줄 수", "배포 횟수만"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "devsecops",
    label: "DevSecOps",
    title: "DevSecOps / Security Engineer",
    subtitle: "개발 파이프라인에 보안을 자동화하는 역할",
    summary: "IAM, 시크릿 관리, 취약점 스캔, SAST/DAST, 컨테이너 보안, 공급망 보안 질문이 나옵니다.",
    keywords: ["IAM", "Secrets", "SAST", "DAST", "Container Security", "Supply Chain"],
    focusAreas: [
      "CI/CD 내 보안 스캔 자동화",
      "권한 최소화와 IAM 정책 설계",
      "시크릿 관리와 키 로테이션",
      "컨테이너 이미지/의존성 취약점 관리",
    ],
    topicIds: ["security-question-map", "authn-authz", "general-cs-practical-deep-dive", "cicd-cdn"],
    mcq: [
      {
        question: "Shift-left security의 의미는?",
        options: [
          "개발 초기에 보안 검사를 통합해 빨리 발견한다",
          "배포 직전에만 보안을 점검한다",
          "보안을 운영팀에만 맡긴다",
          "보안 검사를 생략한다",
        ],
        answerIndex: 0,
      },
      {
        question: "시크릿이 Git에 올라갔을 때 우선 대응은?",
        options: [
          "커밋 메시지만 수정한다",
          "즉시 revoke/rotate 후 영향 범위를 점검한다",
          "그대로 둔다",
          "리포지토리 이름을 변경한다",
        ],
        answerIndex: 1,
      },
      {
        question: "SAST와 DAST의 차이는?",
        options: [
          "둘은 동일하다",
          "SAST는 런타임 분석이다",
          "SAST는 소스 코드 정적 분석, DAST는 실행 중 동적 분석이다",
          "DAST는 컴파일 단계 분석이다",
        ],
        answerIndex: 2,
      },
      {
        question: "컨테이너 이미지를 안전하게 운영하려면?",
        options: [
          "취약점 스캔·최소 베이스 이미지·이미지 서명",
          "root 사용자로 항상 실행",
          "모든 포트 개방",
          "패키지를 최신으로 두지 않음",
        ],
        answerIndex: 0,
      },
      {
        question: "최소 권한 원칙(least privilege)의 목적은?",
        options: ["관리 편의를 위해 모두 admin 부여", "감사 로그 제거", "MFA 비활성화", "필요한 권한만 부여해 피해 범위를 줄임"],
        answerIndex: 3,
      },
    ],
  },
  {
    id: "ai-ml",
    label: "AI/ML",
    title: "AI / ML Engineer",
    subtitle: "모델을 학습·평가·추론 가능한 제품 기능으로 만드는 역할",
    summary:
      "모델 평가, 피처 엔지니어링, 추론 최적화뿐 아니라 LLM 앱, 프롬프트 엔지니어링, RAG, 에이전트 운영 질문이 자주 나옵니다.",
    keywords: ["ML", "LLM", "Prompt", "RAG", "Evaluation", "Agent"],
    focusAreas: [
      "모델 학습/검증/테스트 데이터 분리",
      "프롬프트 설계, 컨텍스트 엔지니어링, structured output",
      "RAG 검색 품질, chunking, reranking, grounding",
      "LLM hallucination 완화, 평가 세트, LLM-as-judge",
      "모델/LLM 서빙, 비용/지연 최적화, 보안 가드레일",
    ],
    topicIds: ["ai-prompt-engineering-practical-interview", "algorithm-question-map", "data-structure-question-map"],
    mcq: [
      {
        question: "Precision과 Recall 중 Recall이 더 중요한 상황은?",
        options: [
          "놓치면 안 되는 경우(질병·사기 탐지 등)",
          "오탐 비용만 큰 경우",
          "데이터가 균형일 때만",
          "항상 Precision이 우선",
        ],
        answerIndex: 0,
      },
      {
        question: "좋은 프롬프트의 핵심 구성 요소는?",
        options: ["긴 문장 하나", "역할·목표·제약·출력 형식·예시", "이모지 다수", "무작위 키워드 나열"],
        answerIndex: 1,
      },
      {
        question: "RAG를 설계할 때 핵심 고려사항은?",
        options: [
          "검색 품질(chunking·임베딩·reranking)과 근거 제시",
          "모델 파라미터 수만 늘리기",
          "프롬프트를 짧게만 유지",
          "캐시 비활성화",
        ],
        answerIndex: 0,
      },
      {
        question: "LLM 답변 품질을 평가하는 합리적인 방법은?",
        options: [
          "느낌으로 판단",
          "응답 길이로만 평가",
          "golden set과 LLM-as-judge에 샘플 검수를 병행",
          "지연 시간만 측정",
        ],
        answerIndex: 2,
      },
      {
        question: "프롬프트 인젝션을 완화하는 방법은?",
        options: [
          "입력 분리·권한 제한·출력 검증 가드레일",
          "사용자 입력을 그대로 신뢰",
          "시스템 프롬프트 공개",
          "모든 도구 호출 자동 허용",
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    title: "Data Engineer / Data Scientist",
    subtitle: "데이터 파이프라인과 분석/실험으로 의사결정을 돕는 역할",
    summary: "ETL/ELT, 데이터 모델링, Airflow/Spark, 실험 설계, 통계, 데이터 품질 질문이 많습니다.",
    keywords: ["ETL", "ELT", "Spark", "Airflow", "DW", "Experiment"],
    focusAreas: [
      "배치/스트리밍 파이프라인 설계",
      "데이터 웨어하우스/레이크하우스 모델링",
      "데이터 품질, lineage, 재처리 전략",
      "A/B 테스트와 통계적 유의성",
    ],
    topicIds: ["data-structure-question-map", "algorithm-question-map", "general-cs-practical-deep-dive"],
    mcq: [
      {
        question: "ETL과 ELT의 차이는?",
        options: [
          "ETL은 적재 전 변환, ELT는 적재 후 웨어하우스에서 변환한다",
          "둘은 동일하다",
          "ELT는 변환을 하지 않는다",
          "ETL은 항상 실시간이다",
        ],
        answerIndex: 0,
      },
      {
        question: "데이터 파이프라인 실패 시 재처리를 위해 중요한 것은?",
        options: ["로그 삭제", "멱등성과 체크포인트, 재실행 가능한 설계", "수동 복사", "스키마 무시"],
        answerIndex: 1,
      },
      {
        question: "A/B 테스트에서 p-value의 의미로 옳은 것은?",
        options: [
          "효과 크기 그 자체",
          "표본 수",
          "귀무가설이 맞다고 가정할 때 관측 결과가 나올 확률",
          "신뢰구간의 폭",
        ],
        answerIndex: 2,
      },
      {
        question: "데이터 품질 모니터링 항목으로 적절한 것은?",
        options: ["null 비율·중복·freshness·분포 드리프트", "파일 색상", "서버 위치", "변수명 길이"],
        answerIndex: 0,
      },
      {
        question: "스트리밍과 배치 처리의 선택 기준은?",
        options: ["개발자 취향", "지연 허용도와 데이터 도착 패턴", "파일 확장자", "회사 규모만"],
        answerIndex: 1,
      },
    ],
  },
];

const POSITION_CONCEPT_GROUPS: Record<string, InterviewPositionConceptGroup[]> = {
  fe: [
    {
      title: "브라우저·렌더링 기본기",
      description: "FE 면접에서 가장 자주 CS로 이어지는 영역입니다.",
      concepts: [
        {
          term: "Critical Rendering Path",
          summary: "HTML/CSS/JS가 DOM, CSSOM, Render Tree, Layout, Paint, Composite를 거쳐 화면이 되는 과정입니다.",
          answerHint: "LCP 개선, CSS/JS 로딩 전략, Reflow/Repaint 차이까지 연결하면 좋습니다.",
          topicId: "critical-render-path",
        },
        {
          term: "CSR/SSR/SSG/ISR",
          summary: "렌더링 위치와 생성 시점에 따른 전략입니다. SEO, TTFB, hydration, 서버 비용을 함께 비교합니다.",
          answerHint: "상품 상세/문서/대시보드처럼 실제 화면 유형을 예로 들어 선택 기준을 말합니다.",
          topicId: "csr-ssr",
        },
        {
          term: "Event Loop",
          summary: "Call Stack, Web API, Macro/Microtask Queue를 통해 JS 비동기 코드 실행 순서를 설명합니다.",
          answerHint: "Promise.then과 setTimeout 순서, 렌더링 타이밍, 메인 스레드 블로킹까지 연결합니다.",
          topicId: "event-loop",
        },
      ],
    },
    {
      title: "React·상태·보안",
      description: "프레임워크 질문이 실무 설계 질문으로 넘어가는 구간입니다.",
      concepts: [
        {
          term: "상태 관리 기준",
          summary: "로컬 상태, 서버 상태, URL 상태, 전역 클라이언트 상태를 역할별로 나누는 기준입니다.",
          answerHint: "React Query는 서버 상태, Zustand/Redux는 클라이언트 공유 상태처럼 책임을 분리해 말합니다.",
          topicId: "state-management",
        },
        {
          term: "인증/인가와 토큰 저장",
          summary: "로그인 여부와 권한 판단을 구분하고, 쿠키/메모리/localStorage 저장의 위협 모델을 비교합니다.",
          answerHint: "XSS/CSRF, httpOnly cookie, refresh token rotation을 함께 언급하면 깊어집니다.",
          topicId: "authn-authz",
        },
        {
          term: "폴더 구조와 컴포넌트 경계",
          summary: "feature-based 구조, shared UI, hooks/services의 경계를 정해 변경 범위를 줄이는 설계입니다.",
          answerHint: "컴포넌트 재사용보다 도메인 응집과 의존성 방향을 먼저 말하면 좋습니다.",
          topicId: "folder-structure-architecture",
        },
      ],
    },
  ],
  be: [
    {
      title: "API·데이터 정합성",
      description: "백엔드 면접에서 실무 사고력을 가장 잘 드러내는 개념입니다.",
      concepts: [
        {
          term: "멱등성",
          summary: "같은 요청을 여러 번 보내도 결과가 한 번 처리된 것과 같도록 만드는 성질입니다.",
          answerHint: "결제/주문 API에서 idempotency key, unique constraint, retry 정책으로 설명합니다.",
          topicId: "general-cs-practical-deep-dive",
        },
        {
          term: "트랜잭션 격리 수준",
          summary: "동시성 상황에서 dirty/non-repeatable/phantom read를 어느 정도 허용할지 정하는 기준입니다.",
          answerHint: "정합성과 성능의 trade-off, lock 경합, 재시도 전략까지 연결합니다.",
          topicId: "general-cs-practical-deep-dive",
        },
        {
          term: "캐시 정합성",
          summary: "DB 부하를 줄이는 대신 stale data, cache stampede, invalidation 문제가 생깁니다.",
          answerHint: "cache-aside, TTL jitter, stale-while-revalidate, write-through를 비교합니다.",
          topicId: "general-cs-practical-deep-dive",
        },
      ],
    },
    {
      title: "확장성과 장애 대응",
      description: "대용량 트래픽/장애 질문에서 자주 나오는 백엔드 기본기입니다.",
      concepts: [
        {
          term: "메시지 큐",
          summary: "요청 처리와 후속 작업을 분리해 지연과 장애 전파를 줄이는 비동기 처리 방식입니다.",
          answerHint: "at-least-once, 중복 처리, DLQ, 재시도/멱등성을 함께 말합니다.",
        },
        {
          term: "DB 인덱스",
          summary: "읽기 성능을 높이는 자료구조지만 쓰기 비용, 저장 공간, 선택도 문제가 생깁니다.",
          answerHint: "복합 인덱스 순서, 실행 계획, 커버링 인덱스까지 연결합니다.",
          topicId: "general-cs-practical-deep-dive",
        },
        {
          term: "인증/인가 서버 검증",
          summary: "클라이언트 UI 제어는 보안이 아니며, API 서버에서 리소스 권한을 반드시 검증해야 합니다.",
          answerHint: "RBAC/ABAC, resource ownership, audit log를 함께 언급합니다.",
          topicId: "authn-authz",
        },
      ],
    },
  ],
  fullstack: [
    {
      title: "제품 흐름 전체 설계",
      description: "FE/BE 경계와 빠른 출시 사이의 균형을 묻는 개념입니다.",
      concepts: [
        {
          term: "FE/BE 책임 분리",
          summary: "UI 상태와 사용자 흐름은 FE, 권한/정합성/도메인 규칙은 BE가 최종 책임을 집니다.",
          answerHint: "폼 검증은 FE UX + BE 최종 검증처럼 중복될 수 있다고 말합니다.",
        },
        {
          term: "API 계약",
          summary: "화면과 서버가 주고받는 데이터 구조, 에러 형식, pagination, versioning을 합의하는 일입니다.",
          answerHint: "OpenAPI, mock, contract test, backward compatibility로 이어가면 좋습니다.",
        },
        {
          term: "기술 부채 관리",
          summary: "빠른 출시를 위해 생긴 구조적 비용을 위험도와 변경 빈도 기준으로 갚는 판단입니다.",
          answerHint: "사용자 영향, 배포 빈도, 장애 가능성, 리팩터링 비용으로 우선순위를 말합니다.",
          topicId: "software-engineering-question-map",
        },
      ],
    },
  ],
  mobile: [
    {
      title: "앱 플랫폼 기본기",
      description: "모바일 면접에서 웹과 다른 지점을 보여주는 개념입니다.",
      concepts: [
        {
          term: "앱 생명주기",
          summary: "foreground/background/inactive 상태 전환에 따라 네트워크, 저장, 권한 UX가 달라집니다.",
          answerHint: "복귀 시 stale data 갱신, background task 제한, push deep link를 함께 말합니다.",
        },
        {
          term: "권한 요청 UX",
          summary: "카메라/앨범/알림 권한은 앱 시작이 아니라 기능 사용 직전에 맥락과 함께 요청하는 것이 좋습니다.",
          answerHint: "거부 후 설정 이동, 최소 권한, 스토어 심사 설명 문구까지 연결합니다.",
        },
        {
          term: "오프라인/동기화",
          summary: "네트워크가 불안정한 환경에서 로컬 캐시, optimistic update, conflict resolution을 고려합니다.",
          answerHint: "읽기 캐시와 쓰기 큐를 나눠 설명하면 실무적으로 보입니다.",
        },
      ],
    },
  ],
  infra: [
    {
      title: "클라우드·네트워크 기반",
      description: "Infra/Platform 면접의 기본 언어에 해당하는 개념입니다.",
      concepts: [
        {
          term: "VPC/Subnet/Routing",
          summary:
            "서비스 네트워크 경계를 나누고 public/private 접근, routing table, NAT, 보안 그룹으로 흐름을 제어합니다.",
          answerHint: "인터넷 노출 리소스와 내부 리소스를 왜 분리하는지부터 설명합니다.",
          topicId: "general-cs-practical-deep-dive",
        },
        {
          term: "Kubernetes 기본 객체",
          summary: "Pod, Deployment, Service, Ingress, ConfigMap, Secret이 배포/노출/설정을 담당합니다.",
          answerHint: "Deployment는 원하는 상태 유지, Service는 안정적인 네트워크 엔드포인트라고 말합니다.",
        },
        {
          term: "IaC",
          summary: "인프라를 코드로 선언해 리뷰, 재현성, 변경 추적을 가능하게 만드는 방식입니다.",
          answerHint: "Terraform state 관리, drift, plan/apply 리뷰 프로세스를 함께 말합니다.",
        },
      ],
    },
  ],
  devops: [
    {
      title: "배포와 피드백 루프",
      description: "DevOps는 도구보다 개발/운영 사이클을 줄이는 개념으로 답하는 게 좋습니다.",
      concepts: [
        {
          term: "CI/CD 파이프라인",
          summary: "lint, test, build, security scan, deploy, smoke test를 자동화해 변경을 작게 자주 내보냅니다.",
          answerHint: "실패 시 어디서 멈추고 어떤 알림/롤백이 필요한지 같이 말합니다.",
          topicId: "cicd-cdn",
        },
        {
          term: "Blue-Green/Canary",
          summary: "새 버전을 안전하게 노출하기 위한 배포 전략입니다. 트래픽 전환 단위와 롤백 속도가 핵심입니다.",
          answerHint: "Canary는 관측 지표가 반드시 있어야 의미가 있다고 말합니다.",
          topicId: "cicd-cdn",
        },
        {
          term: "Observability",
          summary: "로그, 메트릭, 트레이스로 시스템 내부 상태를 추론해 장애 원인을 찾는 능력입니다.",
          answerHint: "RED/USE 지표, correlation id, distributed tracing을 언급하면 좋습니다.",
        },
      ],
    },
  ],
  sre: [
    {
      title: "신뢰성 지표",
      description: "SRE는 감이 아니라 지표로 안정성을 운영하는 역할입니다.",
      concepts: [
        {
          term: "SLI/SLO/SLA",
          summary: "SLI는 측정 지표, SLO는 목표, SLA는 외부 약속과 보상 조건입니다.",
          answerHint: "가용성 99.9%가 월 장애 허용 시간으로 어떻게 환산되는지 말하면 좋습니다.",
        },
        {
          term: "Error Budget",
          summary: "허용 가능한 실패량을 정해 기능 개발 속도와 안정성 투자 사이의 균형을 잡는 장치입니다.",
          answerHint: "에러 버짓 소진 시 배포 freeze나 안정화 작업으로 전환한다고 설명합니다.",
        },
        {
          term: "Incident Response",
          summary: "장애 탐지, 역할 분담, 완화, 커뮤니케이션, 회고까지 포함하는 운영 프로세스입니다.",
          answerHint: "MTTD/MTTR, postmortem, action item 추적까지 연결합니다.",
        },
      ],
    },
  ],
  devsecops: [
    {
      title: "보안 자동화",
      description: "보안을 리뷰 마지막 단계가 아니라 개발 파이프라인에 넣는 개념입니다.",
      concepts: [
        {
          term: "Shift-left Security",
          summary: "개발 초기에 SAST, dependency scan, secret scan을 넣어 취약점을 빠르게 발견합니다.",
          answerHint: "개발자 경험을 해치지 않도록 severity와 false positive 관리가 중요하다고 말합니다.",
          topicId: "security-question-map",
        },
        {
          term: "Secret Management",
          summary: "API key, token, certificate를 코드가 아닌 안전한 저장소에서 주입하고 주기적으로 회전합니다.",
          answerHint: "Git 유출 시 revoke/rotate/audit 순서로 대응한다고 설명합니다.",
          topicId: "security-question-map",
        },
        {
          term: "Supply Chain Security",
          summary: "의존성, 이미지, 빌드 산출물, 배포 경로가 변조되지 않았는지 검증하는 영역입니다.",
          answerHint: "SBOM, image signing, provenance, least privilege를 함께 말합니다.",
        },
      ],
    },
  ],
  "ai-ml": [
    {
      title: "LLM 제품화",
      description: "요즘 AI 포지션에서 모델 자체보다 제품 운영 능력을 많이 봅니다.",
      concepts: [
        {
          term: "Prompt Engineering",
          summary: "역할, 목표, 입력, 제약, 출력 형식, 예시, 검증 기준을 설계해 모델 실패를 줄이는 작업입니다.",
          answerHint: "프롬프트도 버전 관리/회귀 테스트 대상이라고 말하면 좋습니다.",
          topicId: "ai-prompt-engineering-practical-interview",
        },
        {
          term: "RAG",
          summary: "검색으로 외부 지식을 가져와 LLM 답변의 최신성/근거성을 보강하는 구조입니다.",
          answerHint: "chunking, embedding, reranking, grounding, citation을 순서대로 설명합니다.",
          topicId: "ai-prompt-engineering-practical-interview",
        },
        {
          term: "LLM Evaluation",
          summary: "정확성, 근거성, 안전성, 일관성, 비용/지연을 golden set과 judge로 평가합니다.",
          answerHint: "LLM-as-judge도 편향이 있으므로 샘플링 검수를 병행한다고 말합니다.",
          topicId: "ai-prompt-engineering-practical-interview",
        },
      ],
    },
  ],
  data: [
    {
      title: "데이터 파이프라인",
      description: "데이터 포지션은 파이프라인 안정성과 품질을 같이 봅니다.",
      concepts: [
        {
          term: "ETL/ELT",
          summary: "ETL은 변환 후 적재, ELT는 적재 후 웨어하우스에서 변환하는 방식입니다.",
          answerHint: "데이터 규모, DW 성능, 재처리 용이성 기준으로 선택한다고 말합니다.",
        },
        {
          term: "Data Quality",
          summary: "스키마, null, 중복, freshness, volume, distribution drift를 검증하는 체계입니다.",
          answerHint: "품질 실패 시 알림, 격리, 재처리, downstream 영향 파악을 연결합니다.",
        },
        {
          term: "A/B Test",
          summary: "실험군/대조군으로 제품 변경의 효과를 통계적으로 검증하는 방식입니다.",
          answerHint: "표본 크기, p-value, confidence interval, peeking 문제를 함께 말합니다.",
        },
      ],
    },
  ],
};

export const INTERVIEW_POSITIONS: InterviewPosition[] = BASE_INTERVIEW_POSITIONS.map((position) => ({
  ...position,
  questions: INTERVIEW_QUESTIONS[position.id] ?? [],
  conceptGroups: POSITION_CONCEPT_GROUPS[position.id] ?? [],
}));
