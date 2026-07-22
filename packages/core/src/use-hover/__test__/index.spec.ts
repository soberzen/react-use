import { describe, test, expect, vi } from 'vitest';
import { renderHook, fireEvent, act } from '@testing-library/react';
import useHover from '..';

describe('useHover', () => {
  test('测试是否移入元素时触发 hover 事件', () => {
    const { result } = renderHook(() => useHover());

    expect(result.current[1]).toBe(false);

    const mockDiv = document.createElement('div');
    document.body.appendChild(mockDiv);

    act(() => {
      result.current[0](mockDiv);
    });

    fireEvent.mouseEnter(mockDiv);

    expect(result.current[1]).toBe(true);

    fireEvent.mouseLeave(mockDiv);
    expect(result.current[1]).toBe(false);

    document.body.removeChild(mockDiv);
  });

  test('测试 externalRef (Object ref 和 Function ref)', () => {
    // 测试 Object ref
    const refObject = { current: null };
    const { result: res1 } = renderHook(() => useHover({ externalRef: refObject }));

    const div1 = document.createElement('div');
    act(() => {
      res1.current[0](div1);
    });
    expect(refObject.current).toBe(div1);

    // 测试 Function ref
    const refFn = vi.fn();
    const { result: res2 } = renderHook(() => useHover({ externalRef: refFn }));

    const div2 = document.createElement('div');
    act(() => {
      res2.current[0](div2);
    });
    expect(refFn).toHaveBeenCalledWith(div2);
  });
});
