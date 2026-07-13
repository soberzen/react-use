import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useToggle from '..';

describe('useToggle', () => {
  test('should return initial value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
    // 测试初始值为 true 的情况
    const { result: trueResult } = renderHook(() => useToggle(true));
    expect(trueResult.current[0]).toBe(true);
    // 测试初始值为 false 的情况
    const { result: falseResult } = renderHook(() => useToggle(false));
    expect(falseResult.current[0]).toBe(false);
    // 测试自定义设置reverse 的情况
    const { result: reverseResult } = renderHook(() => useToggle('男', '女'));
    expect(reverseResult.current[0]).toBe('男');
    // 测试初始值为 undefined 的情况
    const { result: undefinedResult } = renderHook(() => useToggle(undefined));
    expect(undefinedResult.current[0]).toBe(undefined);
    // 测试初始值为 null 的情况
    const { result: nullResult } = renderHook(() => useToggle(null));
    expect(nullResult.current[0]).toBe(null);
  });
  test('should toggle value when toggle is called', () => {
    // 测试不设置默认值的情况
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
    // 测试自定义设置reverse 的情况
    const { result: reverseResult } = renderHook(() => useToggle('男', '女'));
    expect(reverseResult.current[0]).toBe('男');
    act(() => reverseResult.current[1]());
    expect(reverseResult.current[0]).toBe('女');
    act(() => reverseResult.current[1]());
    expect(reverseResult.current[0]).toBe('男');
    // 测试设置 reverseValue 为 undefined 的情况
    const { result: customResult } = renderHook(() => useToggle('男', undefined));
    expect(customResult.current[0]).toBe('男');
    act(() => customResult.current[1]());
    expect(customResult.current[0]).toBe(undefined);
    act(() => customResult.current[1]());
    expect(customResult.current[0]).toBe('男');
    // 测试设置 defaultValue 为 undefined 的情况
    const { result: customResult2 } = renderHook(() => useToggle(undefined, '男'));
    expect(customResult2.current[0]).toBe(undefined);
    act(() => customResult2.current[1]());
    expect(customResult2.current[0]).toBe('男');
    // 测试设置 reverseValue 为 null 的情况
    const { result: customResult3 } = renderHook(() => useToggle('男', null));
    expect(customResult3.current[0]).toBe('男');
    act(() => customResult3.current[1]());
    expect(customResult3.current[0]).toBe(null);
    // 测试不设置 reverseValue 的情况
    const { result: customResult4 } = renderHook(() => useToggle('男'));
    expect(customResult4.current[0]).toBe('男');
    act(() => customResult4.current[1]());
    expect(customResult4.current[0]).toBe('男');
  });
});
