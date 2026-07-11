import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    reporters: ['default', 'verbose'], // 报告器 默认、详细
    coverage: {
      provider: 'istanbul',
      include: ['src/**/__tests__/**/*.spec.ts?(x)'],
      exclude: ['src/index.ts'], // 排除入口文件
    },
  },
});
