module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jasmine: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": ["error", "unix"],
    "react/prop-types": "off",
  },
};
