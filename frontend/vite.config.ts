import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const test = {
  globals: true,
  environment: 'node' as const,
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
};

const config = {
  plugins: [react()],
  test,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3004,
    proxy: {
      '/api': {
        target: 'https://api.defbj.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    outDir: 'build',
  },
} satisfies UserConfig & { test: typeof test };

export default defineConfig(config as UserConfig);
