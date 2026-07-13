import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useScroll from '..';

describe('useScroll', () => {
  beforeEach(() => {
    // 1. 因为底层依赖了 useRafState，所以必须开启伪造定时器
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('初始状态应该为 { x: 0, y: 0 }', () => {
    const targetEl = document.createElement('div');
    const ref = { current: targetEl };

    const { result } = renderHook(() => useScroll(ref));

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  test('当发生滚动事件时，应该在下一帧更新坐标状态', () => {
    const targetEl = document.createElement('div');
    const ref = { current: targetEl };

    const { result } = renderHook(() => useScroll(ref));

    targetEl.scrollLeft = 50;
    targetEl.scrollTop = 100;

    act(() => {
      targetEl.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 0, y: 0 });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(result.current).toEqual({ x: 50, y: 100 });
  });

  test('当组件卸载时，应该正确移除滚动事件监听器', () => {
    const targetEl = document.createElement('div');
    const ref = { current: targetEl };

    const removeSpy = vi.spyOn(targetEl, 'removeEventListener');

    const { unmount } = renderHook(() => useScroll(ref));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  test('在开发环境下，如果传入非法的 ref 应该抛出 console.error 警告', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-expect-error 故意传入非对象
    renderHook(() => useScroll(123));
    expect(errorSpy).toHaveBeenCalledWith('`useScroll` expects a single ref argument.');
    errorSpy.mockClear();

    // @ts-expect-error 故意传入 null
    renderHook(() => useScroll(null));
    expect(errorSpy).toHaveBeenCalledWith('`useScroll` expects a single ref argument.');
    errorSpy.mockClear();

    // @ts-expect-error 传入空对象
    renderHook(() => useScroll({}));
    expect(errorSpy).toHaveBeenCalledWith('`useScroll` expects a single ref argument.');
    errorSpy.mockClear();

    const mockEl = document.createElement('div');
    renderHook(() => useScroll({ current: mockEl }));
    expect(errorSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });

  test('在生产环境下，如果传入非法的 ref 应该静默处理', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-expect-error intentionally testing invalid runtime input
    const { result } = renderHook(() => useScroll(null));

    expect(errorSpy).not.toHaveBeenCalled();
    // 默认值
    expect(result.current).toEqual({ x: 0, y: 0 });

    process.env.NODE_ENV = originalEnv;
  });

  test('在滚动回调触发时，如果 ref.current 突然变为空，应该不更新状态', () => {
    const targetEl = document.createElement('div');
    const ref = { current: targetEl as HTMLElement | null };

    const { result } = renderHook(() => useScroll(ref as any));
    ref.current = null;

    act(() => {
      targetEl.dispatchEvent(new Event('scroll'));
    });
    act(() => {
      vi.runOnlyPendingTimers();
    });
    expect(result.current).toEqual({ x: 0, y: 0 });
  });
});
