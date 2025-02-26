import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Treat specific rules as warnings instead of errors
      "react-hooks/exhaustive-deps": "warn", // Treat missing dependencies as warnings
      "@typescript-eslint/no-unused-vars": "warn", // Treat unused variables as warnings
      // Add other rules here as needed
    },
  },
];

export default eslintConfig;
