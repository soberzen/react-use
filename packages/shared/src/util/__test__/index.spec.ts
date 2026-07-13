import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { isBrowser, isNavigator, noop, on, off } from '..';

describe('shared utilities', () => {
  describe('isBrowser & isNavigator', () => {
    const originalWindow = globalThis.window;
    const originalNavigator = globalThis.navigator;

    afterEach(() => {
      globalThis.window = originalWindow;
      globalThis.navigator = originalNavigator;
    });
    test('isBrowser 应该为 true', () => {
      expect(isBrowser).toBe(true);
    });
    test('isNavigator 应该为 true', () => {
      expect(isNavigator).toBe(true);
    });
    test('当 window 不存在时，isBrowser 应该为 false', async () => {
      vi.resetModules();
      const originalWindow = globalThis.window;
      Reflect.deleteProperty(globalThis, 'window');
      const { isBrowser: dynamicIsBrowser } = await import('..');

      expect(dynamicIsBrowser).toBe(false);

      globalThis.window = originalWindow;
    });
    test('当 navigator 不存在时，isNavigator 应该为 false', async () => {
      vi.resetModules();
      const originalNavigator = globalThis.navigator;
      Reflect.deleteProperty(globalThis, 'navigator');
      const { isNavigator: dynamicIsNavigator } = await import('..');
      expect(dynamicIsNavigator).toBe(false);
      globalThis.navigator = originalNavigator;
    });
  });
  describe('noop', () => {
    test('noop 是一个什么都不做的空函数', () => {
      expect(noop).toBeTypeOf('function');
      expect(noop()).toBeUndefined();
    });
  });
  describe('on事件绑定', () => {
    test('当传入合法的 obj 且包含 addEventListener 时，应该正确绑定事件', () => {
      const mockElement = document.createElement('div');
      const spy = vi.spyOn(mockElement, 'addEventListener');
      const handler = vi.fn();
      on(mockElement, 'click', handler, { passive: true });
      expect(spy).toHaveBeenCalledWith('click', handler, { passive: true });
      spy.mockRestore();
    });
    test('如果 obj 或者是 obj.addEventListener 不存在，应该静默处理不报错', () => {
      expect(() => on(null, 'click', noop)).not.toThrow();
      const fakeObj = {};
      // @ts-expect-error
      expect(() => on(fakeObj, 'click', noop)).not.toThrow();
    });
  });
  describe('off (事件解绑)', () => {
    test('当传入合法的 obj 且包含 removeEventListener 时，应该正确解绑事件', () => {
      const mockElement = document.createElement('div');
      const spy = vi.spyOn(mockElement, 'removeEventListener');
      const handler = vi.fn();

      off(mockElement, 'click', handler);

      expect(spy).toHaveBeenCalledWith('click', handler);
      spy.mockRestore();
    });

    test('如果 obj 或者是 obj.removeEventListener 不存在，应该静默处理不报错', () => {
      expect(() => off(null, 'click', noop)).not.toThrow();
      const fakeObj = {};
      // @ts-expect-error
      expect(() => off(fakeObj, 'click', noop)).not.toThrow();
    });
  });
});
