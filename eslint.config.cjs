const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**']
  },
  js.configs.recommended,
  // playwright and node scripts only (zero front-end JS)
  {
    files: ['*.js', '*.cjs', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    }
  }
];
