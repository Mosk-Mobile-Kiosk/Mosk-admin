// module.exports = {
//   env: { browser: true, es2020: true, node: true },
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "plugin:react-hooks/recommended",
//   ],
//   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
//   settings: { react: { version: "18.2" } },
//   plugins: ["react-refresh"],
//   rules: {
//     "react-refresh/only-export-components": "warn",
//   },
// }
module.exports = {
  plugins: ["import", "prettier", "react", "react-hooks", "jsx-a11y"], // 설치한 추가적인 규칙 설정
  extends: ["airbnb", "prettier"],
  env: {
    browser: true, // 실행 환경에 대해서 등록
    node: true,
    es2021: true,
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  parserOptions: { ecmaVersion: 2020 },
}
