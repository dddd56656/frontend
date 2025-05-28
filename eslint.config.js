import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,vue}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,vue}"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  // 这里覆盖 ts 文件的 any 校验规则 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      // 允许显式 any，不报错/不警告
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
