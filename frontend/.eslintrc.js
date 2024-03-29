module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'indent': ['error', 2],
    'no-console': 'warn',
    'no-debugger': 'warn',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  overrides: [
    {
      files: [
        '**/tests/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/prettier',
    '@vue/typescript',
  ],
}
