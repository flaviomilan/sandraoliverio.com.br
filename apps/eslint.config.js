import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base JavaScript config
  js.configs.recommended,
  
  // Configuração para TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        IntersectionObserver: 'readonly',
        requestAnimationFrame: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off' // Use TypeScript version
    }
  },
  
  // Configuração para JavaScript (browser globals)
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        IntersectionObserver: 'readonly',
        requestAnimationFrame: 'readonly',
        webVitals: 'readonly'
      }
    },
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
  
  // Configuração para Astro
  ...astroPlugin.configs.recommended,
  
  // Prettier config (deve ser o último)
  prettierConfig,
  
  // Ignorar arquivos
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'public/**',
      '*.config.*',
      'wrangler.toml'
    ]
  }
];