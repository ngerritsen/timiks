module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true
  }
}
