// metro.config.js (NativeWind 뺀 기본 설정)
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
// pnpm 호이스팅 모드니까 복잡한 설정 다 빼고 이것만!
module.exports = config;