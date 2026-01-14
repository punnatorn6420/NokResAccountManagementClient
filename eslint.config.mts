import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Files to ignore from linting
  {
    ignores: [
      "dist/**",
      "**/dist/**",
      "node_modules/**",
      "public/**",
      "src/assets/**",
      ".angular/**",
      "**/.angular/**",
      "**/browser/*.js",
      "**/polyfills-*.js",
      "**/chunk-*.js",
      "**/*.min.js",
    ],
  },

  // 2) Base rule of JavaScript (eslint)
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // 3) Base rule of TypeScript (typescript-eslint)
  ...tseslint.configs.recommended,

  // 4) Custom rule for TypeScript files in src/
  {
    files: ["src/**/*.{ts,tsx,js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Middle ground: allow any but warn (do not fail build)
      "@typescript-eslint/no-explicit-any": "warn",

      // Variables/parameters that are unused but start with _ will not warn
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // If you don't want to be warned about empty blocks / empty expressions, turn these off
      "no-empty": "off",
      "no-unused-expressions": "off",
    },
  },
]);
