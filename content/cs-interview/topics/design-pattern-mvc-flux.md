# Design Pattern (MVC & FLUX)

## 한 줄 정의

**MVC**는 UI·데이터·흐름을 나누는 전통적 패턴, **Flux**는 React 생태계에 맞춘 **단방향 데이터 흐름** 변형.

## 카드 요약

- **MVC (웹)**  
  - Model: 데이터·비즈니스 규칙  
  - View: 화면  
  - Controller: 입력·모델 갱신  
  - FE에서 경계가 흐려지기 쉬움(“Fat Controller”, View가 Model에 직접 접근).

- **Flux**  
  - **Action** → **Dispatcher** → **Store** → **View**  
  - 상태 변경이 **한 방향**이라 추적·디버깅 쉬움.
- **Redux**: Flux 단순화 + 단일 Store + reducer 순수 함수.

## 면접 포인트

1. **왜 단방향인가?** — 양방향 바인딩은 복잡한 상태 동기화·버그 유발.
2. **MVC vs Flux**: React는 보통 “View + 단방향 상태”에 가깝음.
3. **실무**: Redux, Zustand, Context 등은 모두 **“누가 상태를 소유하나”** 문제의 답.

## 질문 예시

- “Flux는 MVC와 뭐가 다른가요?”
- “Redux가 Flux를 어떻게 단순화했나요?”
