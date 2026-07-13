import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    reporters: ['default', 'verbose'], // 报告器 默认、详细
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts', 'src/**/__tests__/**'],
    },
  },
});
