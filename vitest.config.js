import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.jsx'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
