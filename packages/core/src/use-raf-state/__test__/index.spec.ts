import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useRafState from '..';

describe('useRafState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('应该能正常初始化状态', () => {
    const { result } = renderHook(() => useRafState(0));

    expect(result.current[0]).toBe(0);

    const { result: resultFn } = renderHook(() => useRafState(() => 0));

    expect(resultFn.current[0]).toBe(0);
  });
  test('应该在下一帧（raf）到来时更新状态', () => {
    const { result } = renderHook(() => useRafState(0));
    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(0);

    act(() => {
      vi.runOnlyPendingTimers(); // 快进一帧
    });

    expect(result.current[0]).toBe(1);
  });

  test('在同一帧内多次调用时，应该只保留最后一次更新', () => {
    const { result } = renderHook(() => useRafState(0));

    act(() => {
      result.current[1](1);
      result.current[1](2);
      result.current[1](3);
      result.current[1](4);
    });

    act(() => {
      vi.runOnlyPendingTimers(); // 快进一帧
    });

    expect(result.current[0]).toBe(4);
  });

  test('组件卸载时，应该自动取消未执行的 raf 任务，防止内存泄漏', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { result, unmount } = renderHook(() => useRafState(0));

    act(() => {
      result.current[1](100);
    });

    unmount();

    expect(cancelSpy).toHaveBeenCalled();

    act(() => {
      vi.runOnlyPendingTimers(); // 快进一帧
    });

    expect(result.current[0]).toBe(0);

    cancelSpy.mockRestore();
  });
});
