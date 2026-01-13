const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");
const config = getSentryExpoConfig(__dirname);
// pnpm 호이스팅 모드니까 복잡한 설정 다 빼고 이것만!
module.exports = config;