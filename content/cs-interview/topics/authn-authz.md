# Authorization & Authentication

## 한 줄 정의

- **Authentication (인증)**: **누구인지** 확인(로그인).  
- **Authorization (인가)**: **무엇을 할 수 있는지** 판단(권한).

## 카드 요약

- **인증 수단**: 세션 쿠키, JWT(Access/Refresh), OAuth2/OIDC, 패스키 등.
- **JWT**: 서버가 서명한 클레임 — **만료·갱신·저장소(XSS)** 관리 중요. 비밀은 서버만.
- **인가 모델**: RBAC(역할), ABAC(속성), **리소스 단위** 정책.
- **FE 역할**: 토큰 저장 위치(httpOnly 쿠키 vs 메모리), 라우트 가드, **UI만으로 보안 완성 불가**(항상 서버 검증).

## 면접 포인트

1. **인증 ≠ 인가**: 로그인됐어도 관리자 API는 금지일 수 있음.
2. **CSRF vs XSS**: 쿠키 기반 세션은 CSRF 대응, JWT in localStorage는 XSS에 취약.
3. **OAuth 흐름**: Authorization code + PKCE(모바일/SPA 권장).

## 질문 예시

- “JWT를 localStorage에 두면 왜 위험한가요?”
- “프론트에서 관리자 메뉴를 숨기면 보안이 되나요?”
