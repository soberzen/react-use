import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useBoolean from '..';

describe('useBoolean', () => {
  test('should return initial value', () => {
    // 测试默认初始值为 false 的情况
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);
    // 测试初始值为 true 的情况
    const { result: trueResult } = renderHook(() => useBoolean(true));
    expect(trueResult.current[0]).toBe(true);
    // 测试初始值为 false 的情况
    const { result: falseResult } = renderHook(() => useBoolean(false));
    expect(falseResult.current[0]).toBe(false);
  });
  test('should update value when setTrue is called', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].setTrue());
    expect(result.current[0]).toBe(true);
  });
  test('should update value when setFalse is called', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].setFalse());
    expect(result.current[0]).toBe(false);
  });
  test('should update value when toggle is called', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
  });
  test('should update value when set is called', () => {
    const { result } = renderHook(() => useBoolean());
    act(() => result.current[1].set(true));
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].set(false));
    expect(result.current[0]).toBe(false);
  });
});
