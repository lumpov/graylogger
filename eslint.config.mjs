import node from "eslint-plugin-node";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "prettier"),
    {
        plugins: {
            node,
            prettier,
            jest,
        },

        languageOptions: {
            globals: {
                ...globals.mocha,
                ...globals.commonjs,
                ...globals.node,
                ...globals.jest,
                appRoot: "readonly",
                process: "readonly",
                __dirname: "readonly",
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },

            ecmaVersion: 2022,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    experimentalObjectRestSpread: true,
                },
            },
        },

        rules: {
            "no-console": "off",
            "node/no-unsupported-features/node-builtins": "off",

            "node/no-unsupported-features/es-syntax": ["error", {
                version: ">=12.0.0",
            }],

            "node/no-unsupported-features/es-builtins": ["error", {
                version: ">=12.0.0",
            }],

            "prettier/prettier": "error",
            quotes: [2, "single"],
            strict: [2, "global"],
            semi: ["error", "always"],
            "no-var": "error",
            "require-await": "warn",
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
            'import/no-dynamic-require': 'off',
        },
    },
    {
        files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
        plugins: {
            jest,
        },
        rules: {
            'jest/expect-expect': 'error',
            'jest/no-standalone-expect': 'error',
        },
    }
];