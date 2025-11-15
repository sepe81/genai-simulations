import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'e2e/',
        '*.config.js',
        '**/*.test.js',
        '**/*.spec.js',
      ],
    },
    include: ['src/**/*.test.js'],
  },
});
