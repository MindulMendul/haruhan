# CRP (Critical Render Path)

## 한 줄 정의

브라우저가 **HTML을 받아서 첫 픽셀을 그리기까지** 반드시 거쳐야 하는 최소 단계(파싱 → 스타일 → 레이아웃 → 페인트 → 합성).

## 카드 요약

- HTML 파싱 중 `<link>`·`<script>`는 **렌더링을 막을 수 있음**(CSS는 FOUC 방지, JS는 기본적으로 파서 블로킹).
- **CSSOM + DOM → Render Tree** → Layout(Reflow) → Paint → Composite.
- **Critical CSS**: 첫 화면에 필요한 스타일만 인라인/우선 로드해 **FCP·LCP** 개선.
- **리소스 우선순위**: `preload`, `defer`/`async`, 폰트 `font-display`, 이미지 크기·포맷(WebP 등).

## 면접 포인트

1. **왜 JS가 CRP를 막나?** — 파서가 멈추고 DOM/CSSOM 구축이 지연되면 첫 페인트가 늦어짐.
2. **Reflow vs Repaint** — 레이아웃이 바뀌면 Reflow(비용 큼), 색만 바뀌면 Repaint 위주.
3. **최적화 예시** — 코드 스플리팅, lazy load, `content-visibility`, 서버에서 HTML 골격 먼저(SSR/SSG).

## 질문 예시

- “LCP를 줄이려면 프론트에서 뭘 할 수 있나요?”
- “왜 `async`와 `defer`의 차이가 CRP에 영향을 주나요?”
