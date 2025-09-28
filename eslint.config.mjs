// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Adicione esta opção se você tiver problemas de resolução
  // recommended: true,
});

const eslintConfig = [
  // 1. Converte e aplica suas extensões legadas usando compat
  ...compat.extends(
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ),

  // 2. Seu objeto de configuração personalizado (Flat Config Format)
  {
    // A chave 'root' é desnecessária no Flat Config

    // Configurações de Ambiente e Parser vão para 'languageOptions'
    languageOptions: {
      // Substitui 'env'
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
      // Substitui 'parser'
      parser: compat.find('parser', '@typescript-eslint/parser'), // Usa find para resolver o parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    // Configurações de Plugins e Settings
    settings: {
      // A maioria dos plugins legados é resolvida pelo 'compat.extends',
      // mas 'settings' ainda é necessário para plugins como 'react'
      babel: {
        rootMode: 'upward',
      },
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },

    // Regras Personalizadas
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          ignoreUsingDeclarations: false,
          reportUsedIgnorePattern: false,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*'],
        },
      ],
      'prefer-arrow-callback': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['single', 'all', 'multiple', 'none'],
          allowSeparatedGroups: true,
        },
      ],
      // Note que 'import/order' e 'prettier/prettier' não precisam de definição de 'plugins'
      // aqui se a extensão já foi aplicada pelo 'compat.extends' acima.
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          newlinesBetween: 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'prettier/prettier': 'error',
      'react/sort-prop-types': [
        'error',
        {
          callbacksLast: true,
          requiredFirst: true,
          sortShapeProp: true,
        },
      ],
    },
  },
];

export default eslintConfig;
