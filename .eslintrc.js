module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    // Code style rules
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // TypeScript specific rules - commented out since TS plugin not properly configured
    // '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/no-explicit-any': 'warn',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    // Playwright specific rules
    'no-empty-pattern': 'off',
    
    // General code quality
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  // Playwright test files specific rules
  overrides: [
    {
      files: ['tests/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
      rules: {
        'no-console': 'off', // Allow console.log in tests
        // '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};