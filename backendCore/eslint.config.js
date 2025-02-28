import jsConfig from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ...jsConfig.configs.recommended,
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        console: "readonly",
        process: "readonly",
        global: "readonly",
        require: "readonly",
        NodeJS: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly"
      },
      ecmaVersion: 2025, // O cualquier versión de ECMAScript que estés usando
      sourceType: "module", // Permite el uso de import/export
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      // Desactivar la regla no-unused-vars global de ESLint
      "no-unused-vars": "off",
      // Activar la regla específica de TypeScript para que ignore variables con _
      "@typescript-eslint/no-unused-vars": [
        "warn", 
        {
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^_" 
        }
      ]
    }
  }
];
