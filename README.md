# HaruHan

React Native + Expo 프로젝트입니다.

## 개발 환경 설정

### 필수 요구사항

1. **Node.js** (v18 이상)
2. **npm** 또는 **pnpm**
3. **Expo CLI**

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# Android 에뮬레이터에서 실행 (Android Studio 필요)
npm run android

# iOS 시뮬레이터에서 실행 (macOS + Xcode 필요)
npm run ios

# 웹에서 실행
npm run web
```

## 테스트

4개 레이어로 구성된 테스트 하네스를 사용합니다.

1. **단위 테스트** (Vitest + MSW) — `src/**/*.test.ts`. 외부 API 호출은 `src/mocks/`의 MSW 핸들러로 목킹합니다.
2. **컴포넌트 개발/문서화** (Storybook) — `src/components/**/*.stories.tsx`.
3. **시각 회귀 테스트** (Chromatic) — Storybook 빌드를 기준으로 UI 변경을 감지합니다.
4. **E2E 테스트** (Playwright) — `e2e/`. 앱의 모든 페이지에 대한 시나리오이며, 백엔드 API는 `e2e/fixtures.ts`에서 `page.route`로 목킹합니다.

Vitest와 Playwright 양쪽이 참조하는 목 응답 데이터는 `src/mocks/fixtures.ts` 한 곳에서만 관리합니다 — 새 API 응답 형태를 추가/변경할 때 이 파일만 고치면 둘 다 반영됩니다.

```bash
# 개별 실행
pnpm typecheck        # 타입 체크
pnpm lint             # ESLint
pnpm test             # 단위 테스트
pnpm test:coverage    # 커버리지 포함 (임계값 미달 시 실패)
pnpm e2e              # Playwright E2E (chromium/firefox/webkit)
pnpm storybook        # Storybook dev 서버 (:6006)

# 전체 한 번에
pnpm test:all
```

## Android 빌드 설정

### 방법 1: EAS Build (권장)

클라우드에서 빌드하므로 로컬 Android SDK 설치가 필요 없습니다.

```bash
# EAS CLI 설치
npm install -g @expo/eas-cli

# EAS에 로그인
eas login

# 개발용 빌드
eas build --platform android --profile development

# 프로덕션용 빌드
eas build --platform android --profile production
```

### 방법 2: 로컬 빌드

Android Studio와 Android SDK가 필요합니다.

1. **Android Studio 설치**

   - [Android Studio 다운로드](https://developer.android.com/studio)
   - Android SDK 설치

2. **환경 변수 설정**

   ```bash
   # Windows
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_HOME%\platform-tools
   set PATH=%PATH%;%ANDROID_HOME%\tools
   ```

3. **로컬 빌드 실행**
   ```bash
   npx expo run:android
   ```

## 프로젝트 구조

```
haruhan/
├── app/                 # Expo Router 앱 디렉토리
├── components/          # 재사용 가능한 컴포넌트
├── constants/           # 상수 정의
├── hooks/              # 커스텀 훅
├── assets/             # 이미지, 폰트 등 정적 자산
└── android/            # Android 네이티브 코드 (prebuild 후 생성)
```

## 빌드 프로필

- **development**: 개발용 빌드 (디버깅 가능)
- **preview**: 테스트용 APK 빌드
- **production**: 프로덕션용 AAB 빌드

## 문제 해결

### Android SDK 경로 오류

Android Studio를 설치하고 환경 변수를 설정하거나, EAS Build를 사용하세요.

### 빌드 실패

```bash
# 캐시 정리
npx expo prebuild --clean

# 의존성 재설치
npm install
```
