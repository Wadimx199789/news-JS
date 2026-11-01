import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs as tsConfigs } from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
    {
        ignores: ['dist/'],
    },
    js.configs.recommended,
    tsConfigs.recommended,
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    {
        files: ['**/*.ts'],
        extends: [tsConfigs.recommendedTypeChecked],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/parameter-properties': 'error',
        },
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['webpack*.ts'],
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                project: './tsconfig.node.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    prettierConfig
);
