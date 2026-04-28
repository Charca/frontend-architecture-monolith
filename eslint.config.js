import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "*.d.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
      "boundaries/elements": [
        {
          type: "module",
          pattern: "src/modules/**/*",
          mode: "full",
        },
        {
          type: "utils",
          pattern: "src/utils/**/*",
          mode: "full",
        },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "boundaries/dependencies": ["error", {
        default: "disallow",
        rules: [
          {
            from: { type: "module" }, allow: {
              to: [
                { type: "utils" },
              ]
            }
          },

        ],
      }],
    },
  },
);
