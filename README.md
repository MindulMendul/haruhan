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
