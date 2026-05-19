import { defineConfig } from 'rspress/config';

export default defineConfig({
  title: '@sober/react-use',
  themeConfig: {
    lastUpdated: process.env.NODE_ENV === 'production',
    footer: {
      message: `
      <p>Released under the MIT License.</p>
      <p>Copyright © 2026-PRESENT Sober</p>`,
    },
  },
});
