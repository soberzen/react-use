---
pageType: home
title: '@gysober/react-use'

hero:
  name: '@gysober/react-use'
  text: 面向 React 的 Hooks 工具库
  tagline: 提供状态控制、DOM 交互、副作用、生命周期和性能优化等常用能力，基于 TypeScript 编写。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/start.html
    - theme: alt
      text: Hooks 总览
      link: /guide/hooks.html
  image:
    src: /logo.png
    alt: Logo

features:
  - title: '状态管理'
    details: 提供 useBoolean、useToggle、useRafState，覆盖开关、枚举切换和高频状态更新场景。
    icon: 🔁
    link: /hooks/use-boolean.html
  - title: 'DOM 交互'
    details: 内置 useFocus、useHover、useClickAway，快速处理聚焦、悬浮和外部点击等交互。
    icon: 🎯
    link: /hooks/use-focus.html
  - title: '滚动监听'
    details: 使用 useScroll 获取元素横向和纵向滚动位置，适合滚动容器、吸顶和进度反馈。
    icon: 🧭
    link: /hooks/use-scroll.html
  - title: '副作用封装'
    details: 通过 useDocumentTitle、useEffectOnce 简化页面标题和一次性副作用管理。
    icon: 🛠️
    link: /hooks/use-document-title.html
  - title: 'TypeScript 优先'
    details: 源码使用 TypeScript 编写，提供清晰的泛型、返回值和配置项类型。
    icon: 🧩
    link: /hooks/index.html
  - title: '轻量可组合'
    details: Hook 职责保持单一，适合在表单、弹层、滚动容器和交互组件中组合使用。
    icon: ⚡
    link: /hooks/index.html
---
