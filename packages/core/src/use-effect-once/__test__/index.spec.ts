import { describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useEffectOnce from '..';

describe('useEffectOnce', () => {
  test('应该只在组件挂载的时候执行一次 effect', () => {
    const mockEffect = vi.fn();

    const { rerender } = renderHook(() => useEffectOnce(mockEffect));

    expect(mockEffect).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockEffect).toHaveBeenCalledTimes(1);
  });
  test('当组件卸载时， 应该执行 effect 返回的清理函数', () => {
    const mockCleanup = vi.fn();
    const mockEffect = vi.fn(() => mockCleanup);

    const { unmount } = renderHook(() => useEffectOnce(mockEffect));

    expect(mockCleanup).not.toHaveBeenCalled();

    unmount();

    expect(mockCleanup).toHaveBeenCalledTimes(1);
  });
});
