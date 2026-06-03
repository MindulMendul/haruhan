# Web FE Question Map

## 한 줄 정의

프론트엔드 면접에서 자주 이어지는 브라우저·네트워크·렌더링·React·Next.js·JavaScript 개념을 한 번에 훑는 질문 지도.

## 카드 요약

- **브라우저/렌더링**: Critical Rendering Path, 브라우저 구조, Reflow/Repaint, DOM, 이벤트, 좌표계.
- **네트워크**: HTTP, HTTPS, DNS, TCP, UDP, IP, REST API, GraphQL, CDN, OSI 7계층.
- **보안**: SOP, CORS, CSRF, XSS, 인증 방식, OAuth.
- **렌더링 전략**: SPA, MPA, CSR, SSR, SSG, ISR.
- **React/Next.js**: Virtual DOM, JSX, props/state, lifecycle, hooks, hydration, routing, Server Action.
- **JavaScript**: 호이스팅, 데이터 타입, ES6, 클로저, this, 실행 컨텍스트, 비동기 프로그래밍.

## 브라우저·렌더링

- Critical Rendering Path
- 브라우저 구조
- Reflow & Repaint
- DOM(Document Object Model)
- 시멘틱 태그
- SEO
- CSS 우선도 순위
- 이벤트
- WebAssembly
- 반응형 웹
- `visibility: hidden`, `opacity: 0`, `display: none`의 차이

## 네트워크·API

- HTTP(HyperText Transfer Protocol)
- HTTPS(HTTP Secure)
- DNS(Domain Name System)
- TCP
- UDP
- IP 주소
- REST API
- GraphQL
- Web Server
- Web Application Server
- CDN(Content Delivery/Distribution Network)
- OSI 7계층

## 보안·저장소

- 인증 방식
- SOP(Same Origin Policy)
- CORS(Cross Origin Resource Sharing)
- CSRF(Cross Site Request Forgery)
- XSS(Cross Site Scripting)
- OAuth
- `localStorage` vs `sessionStorage` vs Cookies

## 웹 앱 구조

- SPA(Single Page Application)
- MPA(Multi-Page Application)
- CSR(Client Side Rendering)
- SSR(Server Side Rendering)
- SSG(Static Site Generation)
- ISR(Incremental Static Regeneration)
- UI(User Interface)
- UX(User Experience)
- 로그 레벨

## 브라우저 API

- JSON(`JSON.parse`, `JSON.stringify`)
- Fetch API
- History API(`pushState`, `replaceState`)
- Browser Coordinate System(`clientX`, `pageX`, `screenX`)
- Intersection Observer API

## React 질문

- 리액트란?
- 리액트의 원리
- 리액트의 특징
- 가상 DOM
- 단방향 데이터 바인딩
- JSX
- 프로퍼티 드릴링
- 엘리먼트와 컴포넌트의 차이
- 컴포넌트의 생성법
- 클래스형 컴포넌트와 함수형 컴포넌트의 차이
- 라이프사이클
- 훅
- props와 state의 차이
- React에서 변화를 알아차리는 방법
- HTML과 React의 이벤트 처리 차이점
- key props를 사용하는 이유
- HOC(Higher-Order Components)
- React.Fragment
- Portal
- 에러 바운더리
- 리액트의 렌더링 성능 향상 방법
- React 19 버전 내용

## Next.js 질문

- 프레임워크와 라이브러리의 차이
- Next.js의 특징
- React.js와 Next.js의 차이
- Next.js에서 라우팅의 구현 방식
- Next.js가 제공하는 렌더링 기법 4가지
- Next.js로 Full stack 웹 개발을 할 때의 한계
- TTV, TTI, hydration의 관계
- 코드 스플리팅
- Next.js edge runtime
- `router.push`와 `router.replace`의 차이
- Link 컴포넌트의 prefetching 기능
- Server Action
- API Route
- Parallel Route
- Next/Image 특징

## JavaScript 질문

- 호이스팅
- 데이터 타입
- ES6
- 클로저
- 객체 & 프로토타입
- `this`
- 실행 컨텍스트
- 이벤트
- 비동기 프로그래밍
- 개발환경
- 성능 최적화

## 면접 포인트

1. **개념을 외우기보다 연결하기**: CRP → CSR/SSR → SEO → CDN처럼 흐름으로 답하면 좋다.
2. **브라우저 기준으로 설명하기**: DOM, CSSOM, 이벤트 루프, 네트워크 요청의 실제 흐름을 붙인다.
3. **React/Next.js는 원리와 트레이드오프**: “왜 쓰는가”와 “언제 불리한가”를 같이 말한다.

