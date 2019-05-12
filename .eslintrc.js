module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'prettier',
    'react'
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: '16.8'
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100
      }
    ]
  }
};
