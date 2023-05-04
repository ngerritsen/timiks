module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    Promise: true,
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "16.8",
    },
  },
  rules: {
    "@typescript-eslint/no-empty-function": 0,
  },
};
