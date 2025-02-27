import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        console: "readonly", // Para evitar el error de "console is not defined"
        process: "readonly",
        global: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["off"],
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  }
];
