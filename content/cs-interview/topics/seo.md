# SEO (Search Engine Optimization)

## 한 줄 정의

검색 엔진이 사이트를 **잘 크롤링·이해·노출**하도록 구조·콘텐츠·성능을 맞추는 활동.

## 카드 요약

- **크롤링**: `robots.txt`, 사이트맵, 내부 링크 구조로 발견 가능성↑.
- **인덱싱**: 의미 있는 HTML 시맨틱(`<main>`, `<article>`, 제목 계층), 중복·캐노니컬 URL.
- **랭킹**: 콘텐츠 품질, **Core Web Vitals**(LCP, INP, CLS), 모바일 친화성.
- **CSR 한계**: 빈 껍데기 HTML 후 JS 렌더면 봇이 못 봐서 **SSR/SSG·동적 프리렌더**가 중요.

## 면접 포인트

1. **FE가 하는 SEO**: 메타 태그(OG, Twitter), 구조화 데이터(JSON-LD), SSR/ISR, 성능.
2. **SPA vs MPA**: URL·히스토리·초기 HTML에 실제 콘텐츠가 있는지.
3. **클라이언트 전용 위험**: `document.title`만 바꾸고 서버 HTML은 비어 있으면 검색에 불리.

## 질문 예시

- “React SPA에서 SEO를 어떻게 챙기나요?”
- “canonical이 왜 필요한가요?”
