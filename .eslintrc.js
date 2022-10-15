module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // 允许未使用过的变量
    "no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
  },
};
