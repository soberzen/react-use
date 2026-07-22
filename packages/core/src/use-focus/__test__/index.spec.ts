import { describe, test, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFocus } from '..';

describe('useFocus', () => {
  test('测试 input 聚焦与失焦状态', () => {
    const { result } = renderHook(() => useFocus());

    // 1. 初始化时默认未聚焦
    expect(result.current[3]).toBe(false);

    // 2. 创建真实 DOM 并通过 setRef 绑定
    const mockInput = document.createElement('input');
    document.body.appendChild(mockInput);

    act(() => {
      const [setRef] = result.current;
      setRef(mockInput);
    });

    expect(result.current[3]).toBe(false);

    // 3. 触发 focus
    act(() => {
      const [, focus] = result.current;
      focus();
    });

    // 读取最新的 result.current[3]
    expect(result.current[3]).toBe(true);

    // 4. 触发 blur
    act(() => {
      const [, , blur] = result.current;
      blur();
    });

    expect(result.current[3]).toBe(false);

    // 清理 DOM
    document.body.removeChild(mockInput);
  });

  test('测试 externalRef (Object ref 和 Function ref)', () => {
    // 测试 Object ref
    const refObject = { current: null };
    const { result: res1 } = renderHook(() => useFocus({ externalRef: refObject }));

    const input1 = document.createElement('input');
    act(() => {
      res1.current[0](input1);
    });
    expect(refObject.current).toBe(input1);

    // 测试 Function ref
    const refFn = vi.fn();
    const { result: res2 } = renderHook(() => useFocus({ externalRef: refFn }));

    const input2 = document.createElement('input');
    act(() => {
      res2.current[0](input2);
    });
    expect(refFn).toHaveBeenCalledWith(input2);
  });
});
