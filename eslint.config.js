// eslint.config.js — ESLint 9 flat config for React + TS + Tailwind v4
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Ignore build artifacts
  { ignores: ['dist/**', 'node_modules/**'] },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      // Base JS recommended
      ...js.configs.recommended.rules,

      // React + Hooks recommended
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // TypeScript recommended
      ...tsPlugin.configs.recommended.rules,

      // Project preferences
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
    },
  },
];
