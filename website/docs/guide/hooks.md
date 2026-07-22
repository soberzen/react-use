# Hooks 总览

更完整的分类入口在 [Hooks 详情](/hooks/index.html)，也可以直接点击下方 Hook 名称进入详情页。

## 列表

| Hook                                                  | 分类     | 作用                                                                    |
| ----------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| [`useBoolean`](/hooks/use-boolean.html)               | 状态     | 管理 boolean 状态，并返回 `setTrue`、`setFalse`、`toggle`、`set` 操作。 |
| [`useToggle`](/hooks/use-toggle.html)                 | 状态     | 在默认值和反转值之间切换，支持 boolean 或自定义值。                     |
| [`useFocus`](/hooks/use-focus.html)                   | DOM      | 返回 ref、focus、blur 和聚焦状态，适合输入框或可聚焦元素。              |
| [`useHover`](/hooks/use-hover.html)                   | DOM      | 返回 ref 和 hover 状态，用于监听元素鼠标移入、移出。                    |
| [`useClickAway`](/hooks/use-click-away.html)          | DOM      | 监听元素外部点击，常用于下拉菜单、弹层和浮层关闭。                      |
| [`useScroll`](/hooks/use-scroll.html)                 | DOM      | 监听元素滚动位置，返回 `{ x, y }`。                                     |
| [`useDocumentTitle`](/hooks/use-document-title.html)  | 副作用   | 设置页面标题，并在组件卸载或标题变化时恢复上一个标题。                  |
| [`useEffectOnce`](/hooks/use-effect-once.html)        | 生命周期 | 只在组件挂载时执行一次 effect。                                         |
| [`useUnmount`](/hooks/use-unmount.html)               | 生命周期 | 在组件卸载时执行回调，并始终调用最新回调引用。                          |
| [`useIsomorphicEffect`](/hooks/use-isomorphic-effect.html) | SSR      | 在浏览器中使用 `useLayoutEffect`，在非浏览器环境中回退到 `useEffect`。  |
| [`useRafState`](/hooks/use-raf-state.html)            | 性能     | 使用 `requestAnimationFrame` 批量更新 state，适合滚动、动画等高频场景。 |

## 状态

### useBoolean

```tsx
import { useBoolean } from '@gysober/react-use-core';

function Demo() {
  const [checked, { setTrue, setFalse, toggle, set }] = useBoolean();

  return (
    <>
      <button onClick={toggle}>切换</button>
      <button onClick={setTrue}>设为 true</button>
      <button onClick={setFalse}>设为 false</button>
      <button onClick={() => set(!checked)}>取反</button>
    </>
  );
}
```

### useToggle

```tsx
import { useToggle } from '@gysober/react-use-core';

function ThemeSwitch() {
  const [theme, toggleTheme] = useToggle('light', 'dark');

  return <button onClick={toggleTheme}>{theme}</button>;
}
```

## DOM 与交互

### useFocus

```tsx
import { useFocus } from '@gysober/react-use-core';

function SearchInput() {
  const [ref, focus, blur, isFocused] = useFocus<HTMLInputElement>();

  return (
    <>
      <input ref={ref} />
      <button onClick={() => focus()}>聚焦</button>
      <button onClick={blur}>失焦</button>
      <span>{isFocused ? '已聚焦' : '未聚焦'}</span>
    </>
  );
}
```

### useHover

```tsx
import { useHover } from '@gysober/react-use-core';

function HoverBox() {
  const [ref, isHover] = useHover<HTMLDivElement>();

  return <div ref={ref}>{isHover ? 'hover' : 'leave'}</div>;
}
```

### useClickAway

```tsx
import { useRef, useState } from 'react';
import { useClickAway } from '@gysober/react-use-core';

function Dropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(true)}>打开</button>
      {open && <div>菜单内容</div>}
    </div>
  );
}
```

### useScroll

```tsx
import { useRef } from 'react';
import { useScroll } from '@gysober/react-use-core';

function ScrollPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useScroll(ref);

  return (
    <div>
      <span>
        x: {x}, y: {y}
      </span>
      <div ref={ref} style={{ height: 200, overflow: 'auto' }}>
        <div style={{ height: 800 }} />
      </div>
    </div>
  );
}
```

## 副作用与生命周期

### useDocumentTitle

```tsx
import { useDocumentTitle } from '@gysober/react-use-core';

function DetailPage() {
  useDocumentTitle('详情页');

  return <div>详情内容</div>;
}
```

### useEffectOnce

```tsx
import { useEffectOnce } from '@gysober/react-use-core';

function Demo() {
  useEffectOnce(() => {
    console.log('mounted');
  });

  return null;
}
```

### useUnmount

```tsx
import { useUnmount } from '@gysober/react-use-core';

function Demo() {
  useUnmount(() => {
    console.log('unmounted');
  });

  return null;
}
```

### useIsomorphicEffect

```tsx
import { useIsomorphicEffect } from '@gysober/react-use-core';

function Demo() {
  useIsomorphicEffect(() => {
    console.log('browser layout effect or server effect');
  }, []);

  return null;
}
```

## 性能

### useRafState

```tsx
import { useRafState } from '@gysober/react-use-core';

function Demo() {
  const [count, setCount] = useRafState(0);

  return <button onClick={() => setCount((value) => value + 1)}>{count}</button>;
}
```
