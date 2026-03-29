# CI/CD & CDN

## 한 줄 정의

- **CI/CD**: 코드를 **자동으로 빌드·테스트·배포**하는 파이프라인.  
- **CDN**: 정적 자산을 **사용자 가까운 엣지**에서 제공해 지연·부하를 줄임.

## 카드 요약

### CI (Continuous Integration)

- PR마다 **lint, test, build** — 실패 시 머지 막기.
- **캐시**로 의존성 설치 시간 단축.

### CD (Continuous Delivery/Deployment)

- **Delivery**: 배포 가능 상태까지 자동.  
- **Deployment**: 프로덕션까지 자동(승인 게이트 포함 가능).

### CDN

- **엣지 캐시**: HTML/JS/CSS/이미지·폰트.
- **캐시 무효화**: 파일명 해시(번들), purge API.
- **FE 관점**: `Cache-Control`, SWR, 이미지 최적화 URL.

## 면접 포인트

1. **왜 CI인가?** — 회귀 방지, 리뷰와 분리된 “기계적 품질 게이트”.
2. **Blue-Green / Canary**: 무중단·점진 배포.
3. **CDN과 원본**: 동적 API는 원본, 정적은 CDN이 일반적.

## 질문 예시

- “배포 파이프라인에 어떤 단계를 넣나요?”
- “CDN 캐시 깨끗이 하려면?”
