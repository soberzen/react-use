import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '..';
import { afterEach, describe, expect, test } from 'vitest';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  test('应该在挂载时更新 document.title', () => {
    renderHook(() => useDocumentTitle('新标题'));
    expect(document.title).toBe('新标题');
  });

  test('应该对传入的字符串进行 trim 处理', () => {
    renderHook(() => useDocumentTitle('  带空格的标题  '));
    expect(document.title).toBe('带空格的标题');
  });

  test('当参数改变时，应该重新更新 document.title', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: '初始标题' },
    });
    expect(document.title).toBe('初始标题');
    // 模拟参数更新
    rerender({ title: '更新后的标题' });
    expect(document.title).toBe('更新后的标题');
  });

  test('组件卸载时，应该恢复之前的 document.title', () => {
    document.title = '原始标题';
    const { unmount } = renderHook(() => useDocumentTitle('临时标题'));

    expect(document.title).toBe('临时标题');

    unmount();
    expect(document.title).toBe('原始标题');
  });

  test('当不传参或传入 undefined 时，不应该修改 document.title', () => {
    document.title = '保持原样';

    // @ts-expect-error intentionally testing invalid runtime input
    renderHook(() => useDocumentTitle({ string: 111 }));
    expect(document.title).toBe('保持原样');

    // 测试传入 undefined
    // @ts-expect-error intentionally testing invalid runtime input
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: undefined },
    });
    expect(document.title).toBe('保持原样');
  });
});
