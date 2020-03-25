module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'prettier'],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-var': 'error',
    '@typescript-eslint/consistent-type-definitions': [
      'off',
      'interface'
    ],
    'camelcase': 'off',
    '@typescript-eslint/camelcase': ['off', { 'properties': 'always' }]
  }
}
