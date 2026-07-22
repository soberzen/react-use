# Hooks 总览

这里是 `@sober/react-use-core` 当前提供的所有 Hooks。点击 Hook 名称进入详情页，左侧也可以按分类切换。

## 状态

| Hook | 说明 |
| --- | --- |
| [`useBoolean`](/hooks/use-boolean.html) | 管理 boolean 状态，并提供 `setTrue`、`setFalse`、`toggle`、`set` 操作。 |
| [`useToggle`](/hooks/use-toggle.html) | 在 boolean 或两个自定义值之间切换。 |

## DOM 与交互

| Hook | 说明 |
| --- | --- |
| [`useFocus`](/hooks/use-focus.html) | 管理元素聚焦状态，并提供 `focus`、`blur` 方法。 |
| [`useHover`](/hooks/use-hover.html) | 监听元素 hover 状态。 |
| [`useClickAway`](/hooks/use-click-away.html) | 监听目标元素外部点击。 |
| [`useScroll`](/hooks/use-scroll.html) | 监听元素滚动位置，返回 `{ x, y }`。 |

## 副作用与生命周期

| Hook | 说明 |
| --- | --- |
| [`useDocumentTitle`](/hooks/use-document-title.html) | 设置页面标题，并在卸载或标题变化时恢复上一个标题。 |
| [`useEffectOnce`](/hooks/use-effect-once.html) | 只在组件挂载时执行一次 effect。 |
| [`useUnmount`](/hooks/use-unmount.html) | 在组件卸载时执行回调。 |

## 性能

| Hook | 说明 |
| --- | --- |
| [`useRafState`](/hooks/use-raf-state.html) | 使用 `requestAnimationFrame` 合并高频 state 更新。 |

## SSR

| Hook | 说明 |
| --- | --- |
| [`useIsomorphicEffect`](/hooks/use-isomorphic-effect.html) | 浏览器使用 `useLayoutEffect`，非浏览器环境回退到 `useEffect`。 |
