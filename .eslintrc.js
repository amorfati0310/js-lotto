module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint-config-prettier', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'always'],
    'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['./cypress/**/*.js, ./cypress/**/*.js'],
};
