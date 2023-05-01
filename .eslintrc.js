module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react"],
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
};
