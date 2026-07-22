import type { ForwardedRef, RefCallback } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { isFunction, on, off } from '@sober/react-use-shared';

export interface UseHoverOptions<T> {
  externalRef?: ForwardedRef<T>;
}

export type UseHoverReturn<T> = [RefCallback<T>, boolean];
export default function useHover<T extends HTMLElement = HTMLElement>(
  options?: UseHoverOptions<T>
): UseHoverReturn<T> {
  const { externalRef } = options || {};
  const [isHover, setIsHover] = useState(false);
  const [element, setElement] = useState<T | null>(null);

  const setRef: RefCallback<T> = useCallback(
    (node: T | null) => {
      setElement(node);
      if (isFunction(externalRef)) {
        externalRef(node);
      } else if (externalRef) {
        externalRef.current = node;
      }
    },
    [externalRef]
  );

  useEffect(() => {
    if (!element) return;

    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () => setIsHover(false);

    on(element, 'mouseenter', handleMouseEnter);
    on(element, 'mouseleave', handleMouseLeave);

    return () => {
      off(element, 'mouseenter', handleMouseEnter);
      off(element, 'mouseleave', handleMouseLeave);
    };
  }, [element]);
  return [setRef, isHover];
}
