module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "babel", "prettier"],
  rules: {
    "@typescript-eslint/camelcase": "off",
    "prettier/prettier": "error"
  }
}
