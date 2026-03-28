const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**']
  },

  js.configs.recommended,

  // base config: Node + ES2022 (no browser by default)
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
  },

  // Playwright tests run browser code inside page.evaluate()
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
];
