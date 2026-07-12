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
});
