import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import typescript from 'typescript-eslint';
import js from '@eslint/js';
import importSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonar from 'eslint-plugin-sonarjs';
import globals from 'globals';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReact from 'eslint-plugin-react';

export default defineConfig([
  // 忽略 node_modules 和 dist 目录下的文件
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/**/__test__/**'],
  },
  // 推荐配置
  js.configs.recommended,
  typescript.configs.recommended,
  // React 配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  // 其他文件配置
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'unicorn/no-empty-file': 'error',
      'sonarjs/no-implicit-dependencies': ['error', { whitelist: ['@/*'] }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
    plugins: {
      'simple-import-sort': importSort,
      prettier: prettier,
      unicorn: eslintPluginUnicorn,
      sonarjs: eslintPluginSonar,
    },
  },
]);
