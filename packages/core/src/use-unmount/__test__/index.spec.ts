import { describe, test, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useUnmount from '..';

describe('useUnmount', () => {
  test('应该在组件卸载时执行传入的函数', () => {
    const mockFn = vi.fn();

    const { unmount } = renderHook(() => useUnmount(mockFn));

    expect(mockFn).not.toHaveBeenCalled();

    unmount();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('应该总是执行组件卸载前最新的那个函数', () => {
    const mockFnPrev = vi.fn();
    const mockFnNext = vi.fn();

    const { rerender, unmount } = renderHook(({ fn }) => useUnmount(fn), {
      initialProps: { fn: mockFnPrev },
    });

    rerender({ fn: mockFnNext });

    unmount();

    expect(mockFnPrev).not.toHaveBeenCalled();
    expect(mockFnNext).toHaveBeenCalledTimes(1);
  });
});
