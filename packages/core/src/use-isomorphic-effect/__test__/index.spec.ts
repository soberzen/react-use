import React from 'react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

describe('useIsomorphicEffect', () => {
  const originalDocument = globalThis.document;
  beforeEach(() => {
    vi.resetModules(); // 重置模块缓存
  });
  afterEach(() => {
    globalThis.document = originalDocument; // 恢复原始文档
  });
  test('should call callback on client', async () => {
    globalThis.document = originalDocument || {};
    const { useIsomorphicEffect } = await import('..');
    expect(useIsomorphicEffect).toBe(React.useLayoutEffect);
    expect(useIsomorphicEffect).not.toBe(React.useEffect);
  });
  test('should not call callback on server', async () => {
    Reflect.deleteProperty(globalThis, 'document');
    const { useIsomorphicEffect } = await import('..');
    expect(useIsomorphicEffect).toBe(React.useEffect);
    expect(useIsomorphicEffect).not.toBe(React.useLayoutEffect);
  });
});
