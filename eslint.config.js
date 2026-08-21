// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // Playwright의 fixture 콜백 매개변수 이름이 관례상 `use`라서, React 코드가 아닌
    // e2e 테스트 파일에서는 react-hooks 규칙이 이를 훅으로 오인해 오탐을 낸다.
    files: ['e2e/**/*.ts'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]);
