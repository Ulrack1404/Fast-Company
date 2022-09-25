module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2], // отступ
    semi: [2, "always"], // точка с запятой
    "space-before-function-paren": ["error", "never"], // пробел между функцией и аргументами в скобках
    quotes: ["error", "double", { allowTemplateLiterals: true }] // кавычки
  }
};
