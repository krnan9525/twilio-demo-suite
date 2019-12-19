module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier', '@typescript-eslint'],
  ignorePatterns: ['node_modules/', 'dist/', 'public/'],
  rules: {
    'prettier/prettier': [2, { singleQuote: true, semi: true }],
    '@typescript-eslint/interface-name-prefix': [0],
    '@typescript-eslint/no-var-requires': [1],
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/standard',
    "prettier/@typescript-eslint"
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  }
};
