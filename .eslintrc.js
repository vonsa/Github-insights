module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      rules: {
        'import/extensions': 'off',
        'import/first': 'off',
        'import/order': 'off',
        'import/no-mutable-exports': 'off',
        'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 2 }],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        // fix for: https://github.com/typescript-eslint/typescript-eslint/issues/420
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': ['error'],
        // Let real prettier handle fixes
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/extensions': 'off',
        camelcase: 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'import/no-duplicates': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
  },
}
