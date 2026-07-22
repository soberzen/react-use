# 快速开始

## 安装

安装 core 包：

```bash
pnpm add @sober/react-use-core
```

如果你使用 npm 或 yarn：

```bash
npm install @sober/react-use-core
```

```bash
yarn add @sober/react-use-core
```

## 基础使用

从 `@sober/react-use-core` 导入需要的 Hook：

```tsx
import { useBoolean } from '@sober/react-use-core';

function Demo() {
  const [visible, { setTrue, setFalse, toggle }] = useBoolean(false);

  return (
    <>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>打开</button>
      <button onClick={setFalse}>关闭</button>
      {visible && <div>内容区域</div>}
    </>
  );
}
```

## 包入口

`@sober/react-use-core` 当前提供状态、DOM、副作用、生命周期和性能优化相关 Hooks。

```tsx
import {
  useBoolean,
  useClickAway,
  useDocumentTitle,
  useEffectOnce,
  useFocus,
  useHover,
  useIsomorphicEffect,
  useRafState,
  useScroll,
  useToggle,
  useUnmount,
} from '@sober/react-use-core';
```

下一步可以查看 [Hooks 总览](/guide/hooks.html)。
