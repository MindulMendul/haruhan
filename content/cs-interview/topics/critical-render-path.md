# CRP (Critical Render Path)

## 한 줄 정의

브라우저가 HTML/CSS/JS를 받아 **화면의 첫 픽셀을 그리기까지** 거치는 필수 단계와, 그 과정에서 생기는 병목을 다루는 개념.

## 카드 요약

- **DOM/CSSOM**: HTML과 CSS를 각각 파싱해서 만든 트리.
- **Render Tree**: DOM과 CSSOM을 합쳐 실제로 화면에 그려질 노드만 남긴 트리.
- **Layout(Reflow)**: 각 노드의 위치와 크기를 계산.
- **Paint**: 색, 테두리, 그림자 등을 픽셀로 그림.
- **Composite**: 레이어를 합성해 최종 화면을 만듦.

## 5단계 파이프라인

1. **DOM 생성**: HTML을 파싱해 DOM 트리를 만든다. `<script>`는 기본적으로 파싱을 막는다(`defer`/`async`로 완화 가능).
2. **CSSOM 생성**: CSS를 파싱해 CSSOM을 만든다. CSS는 렌더링을 막는 리소스라서, `<head>`의 CSS는 첫 화면을 지연시킬 수 있다.
3. **Render Tree 생성**: DOM과 CSSOM을 결합해 `display: none` 같은 비표시 노드를 제외한 트리를 만든다.
4. **Layout**: 뷰포트 기준으로 각 요소의 정확한 위치·크기(box model)를 계산한다.
5. **Paint & Composite**: 픽셀을 그리고, GPU 레이어를 합성해 화면에 반영한다.

## Reflow와 Repaint

- **Reflow(=Layout)**: 크기, 위치, 구조가 바뀌는 변경(요소 추가/삭제, width/height 변경, 폰트 변경 등)은 레이아웃을 다시 계산하게 만든다. 비용이 가장 크다.
- **Repaint**: 위치/크기는 그대로지만 색상, 배경, 그림자처럼 시각적 속성만 바뀌면 페인트만 다시 한다.
- **Composite만**: `transform`, `opacity`처럼 별도 레이어에서 처리 가능한 속성은 레이아웃/페인트 없이 합성 단계에서만 처리되어 가장 저렴하다.

### 강제 동기 레이아웃(Forced Reflow / Layout Thrashing)

DOM을 변경한 직후 `offsetWidth`, `getBoundingClientRect()` 같은 값을 읽으면, 브라우저는 최신 값을 주기 위해 **레이아웃을 즉시(동기적으로) 다시 계산**한다. 쓰기와 읽기를 반복문 안에서 번갈아 하면 매 반복마다 강제 리플로우가 발생해 성능이 급격히 나빠진다.

```
// 나쁜 예: 쓰기 -> 읽기를 반복해 매번 강제 리플로우 발생
els.forEach((el) => {
  el.style.width = "100px";       // 쓰기
  console.log(el.offsetWidth);    // 읽기 -> 강제 리플로우
});

// 좋은 예: 읽기와 쓰기를 분리(batch)
const widths = els.map((el) => el.offsetWidth); // 읽기를 모아서 먼저
els.forEach((el, i) => { el.style.width = "100px"; });
```

## 최적화 전략

- **렌더링 차단 리소스 줄이기**: CSS는 필요한 만큼만 `<head>`에 인라인/우선 로드하고, 나머지는 지연 로드한다. JS는 `defer`/`async`로 파싱을 막지 않게 한다.
- **레이아웃/페인트 대신 컴포지트만 쓰기**: 애니메이션에는 `top/left` 대신 `transform: translate()`를, `visibility` 대신 `opacity`를 우선 고려한다.
- **`will-change`**: 브라우저에게 "이 속성이 곧 바뀐다"고 미리 알려 별도 레이어를 준비시킨다. 다만 남용하면 메모리를 과도하게 쓰므로 애니메이션 직전에만 붙이고 끝나면 제거하는 식으로 쓴다.
- **CSS Containment(`contain`)**: 특정 영역의 레이아웃/페인트가 다른 영역에 영향을 주지 않는다고 선언해, 브라우저가 재계산 범위를 좁히게 한다.
- **이미지/폰트**: `width`/`height`(또는 `aspect-ratio`)를 명시해 로드 전후로 레이아웃이 밀리지 않게 한다(CLS 방지).

## Core Web Vitals와의 연결

- **LCP(Largest Contentful Paint)**: CRP가 길어질수록 가장 큰 콘텐츠가 그려지는 시점도 늦어진다. 렌더링 차단 리소스 축소, 이미지 최적화, 서버 응답 시간 단축이 직접적인 개선 지점이다.
- **CLS(Cumulative Layout Shift)**: 레이아웃 단계가 로드 이후에도 반복적으로 발생하면(이미지 치수 미지정, 폰트 스왑 등) CLS가 나빠진다.
- **INP(Interaction to Next Paint)**: 상호작용 이후 리플로우/리페인트가 무거우면 다음 프레임 반영이 늦어져 체감 반응성이 떨어진다.

## 대표 질문

- "브라우저 렌더링 파이프라인을 단계별로 설명해주세요."
- "Reflow와 Repaint의 차이는 무엇인가요?"
- "레이아웃 스래싱(layout thrashing)은 왜 생기고 어떻게 피하나요?"
- "`transform`이 `top/left`보다 애니메이션에 유리한 이유는 무엇인가요?"
- "LCP를 개선하려면 CRP의 어느 단계를 손봐야 하나요?"

## 면접 포인트

1. **단계를 순서대로**: DOM → CSSOM → Render Tree → Layout → Paint → Composite 순서를 정확히 말한다.
2. **비용 순서를 안다**: Layout > Paint > Composite 순으로 비용이 크다는 것을 예시(속성별 영향 범위)와 함께 설명한다.
3. **읽기/쓰기 분리를 안다**: 강제 리플로우가 왜 생기는지, 어떻게 배치(batch)로 피하는지 코드 레벨로 설명할 수 있으면 실무형 답변이 된다.
4. **지표로 연결한다**: 개념 설명에서 끝내지 않고 LCP/CLS/INP 같은 실제 지표 개선과 연결하면 깊이가 드러난다.
