import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import useClickAway from '..';

describe('useClickAway', () => {
  let targetElement: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    targetElement = document.createElement('div');
    targetElement.innerHTML = '<span>Inner Text</span>';

    outsideElement = document.createElement('div');

    document.body.appendChild(targetElement);
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('点击元素外部时，应该触发 onClickAway', () => {
    const onClickAway = vi.fn();

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(targetElement);
      useClickAway(ref, onClickAway);
    });
    // 模拟点击外部元素
    fireEvent.mouseDown(outsideElement);

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });

  test('点击元素内部时，不应该触发 onClickAway', () => {
    const onClickAway = vi.fn();

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(targetElement);
      useClickAway(ref, onClickAway);
    });

    // 模拟点击内部元素以及子节点 <span>
    const innerSpan = targetElement.querySelector('span')!;
    fireEvent.mouseDown(targetElement);
    fireEvent.mouseDown(innerSpan);

    expect(onClickAway).not.toHaveBeenCalled();
  });

  test('应该支持自定义多事件类型（如 touchstart）', () => {
    const onClickAway = vi.fn();

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(targetElement);
      useClickAway(ref, onClickAway, ['touchstart', 'click']);
    });

    // 测试 touchstart 事件
    fireEvent.touchStart(outsideElement);
    expect(onClickAway).toHaveBeenCalledTimes(1);

    // 测试 click 事件
    fireEvent.click(outsideElement);
    expect(onClickAway).toHaveBeenCalledTimes(2);
  });

  test('当 onClickAway 回调更新时，应该保持执行最新的回调', () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { rerender } = renderHook(
      ({ cb }) => {
        const ref = useRef<HTMLDivElement>(targetElement);
        useClickAway(ref, cb);
      },
      {
        initialProps: { cb: firstCallback },
      }
    );

    // 触发更新，替换为 secondCallback
    rerender({ cb: secondCallback });

    fireEvent.mouseDown(outsideElement);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  test('当 Hook 对应的组件卸载后，不应该再触发 onClickAway', () => {
    const onClickAway = vi.fn();

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(targetElement);
      useClickAway(ref, onClickAway);
    });

    // 卸载组件
    unmount();

    // 卸载后再点击外部
    fireEvent.mouseDown(outsideElement);

    expect(onClickAway).not.toHaveBeenCalled();
  });
});
