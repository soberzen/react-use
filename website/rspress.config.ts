import { defineConfig } from 'rspress/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  title: 'React Hooks 工具库',
  logoText: 'react-use',
  logo: '/favicon.ico',
  icon: '/favicon.ico',
  lang: 'zh',
  description: '面向 React 的 Hooks 工具库',
  globalStyles: join(__dirname, 'styles/index.css'),
  builderConfig: {
    source: {
      alias: {
        '@sober/react-use-core': join(__dirname, '../packages/core/src/index.ts'),
        '@sober/react-use-shared': join(__dirname, '../packages/shared/src/index.ts'),
      },
    },
  },
  themeConfig: {
    nav: [
      {
        text: '快速开始',
        link: '/guide/start.html',
      },
      {
        text: 'Hooks 总览',
        link: '/hooks/index.html',
      },
    ],
    sidebar: {
      '/hooks/': [
        {
          text: '状态',
          items: [
            {
              text: 'useBoolean',
              link: '/hooks/use-boolean.html',
            },
            {
              text: 'useToggle',
              link: '/hooks/use-toggle.html',
            },
          ],
        },
        {
          text: 'DOM 与交互',
          items: [
            {
              text: 'useFocus',
              link: '/hooks/use-focus.html',
            },
            {
              text: 'useHover',
              link: '/hooks/use-hover.html',
            },
            {
              text: 'useClickAway',
              link: '/hooks/use-click-away.html',
            },
            {
              text: 'useScroll',
              link: '/hooks/use-scroll.html',
            },
          ],
        },
        {
          text: '副作用与生命周期',
          items: [
            {
              text: 'useDocumentTitle',
              link: '/hooks/use-document-title.html',
            },
            {
              text: 'useEffectOnce',
              link: '/hooks/use-effect-once.html',
            },
            {
              text: 'useUnmount',
              link: '/hooks/use-unmount.html',
            },
          ],
        },
        {
          text: '性能',
          items: [
            {
              text: 'useRafState',
              link: '/hooks/use-raf-state.html',
            },
          ],
        },
        {
          text: 'SSR',
          items: [
            {
              text: 'useIsomorphicEffect',
              link: '/hooks/use-isomorphic-effect.html',
            },
          ],
        },
      ],
    },
    outlineTitle: '本页目录',
    searchPlaceholderText: '搜索',
    searchNoResultsText: '没有找到结果',
    searchSuggestedQueryText: '请尝试其他关键词',
    lastUpdatedText: '最后更新',
    prevPageText: '上一页',
    nextPageText: '下一页',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/soberzen/react-use',
      },
    ],
    lastUpdated: process.env.NODE_ENV === 'production',
    footer: {
      message: `
      <p>基于 MIT 许可证发布。</p>
      <p>版权所有 © 2026 至今 Sober</p>`,
    },
  },
});
