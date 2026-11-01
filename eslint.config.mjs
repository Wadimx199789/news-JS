import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs as tsConfigs } from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['dist/', 'node_modules/'],
    },
    js.configs.recommended,
    tsConfigs.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    {
        rules: {
            'no-debugger': 'off',
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    {
        files: ['src/**/*.{js,ts}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                process: 'readonly',
            },
        },
    },
    {
        files: ['**/*.ts'],
        extends: [tsConfigs.recommendedTypeChecked],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
        },
    },
    {
        files: ['webpack*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: globals.node,
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['eslint.config.mjs'],
        languageOptions: {
            globals: globals.node,
        },
    },
    prettierConfig
);
