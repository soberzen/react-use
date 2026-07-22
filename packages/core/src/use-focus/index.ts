import { isFunction, on, off } from '@sober/react-use-shared';
import { type ForwardedRef, type RefCallback, useCallback, useEffect, useState } from 'react';

export type UseFocusReturn<T> = [
  RefCallback<T>,
  (options?: FocusOptions) => void,
  () => void,
  boolean,
];

export interface UseFocusOptions<T> {
  externalRef?: ForwardedRef<T>;
}

export function useFocus<T extends HTMLElement = HTMLInputElement>(
  options?: UseFocusOptions<T>
): UseFocusReturn<T> {
  const { externalRef } = options || {};

  const [element, setElement] = useState<T | null>(null);
  const [isFocused, setIsFocused] = useState(false);

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

  const focus = useCallback(
    (focusOptions?: FocusOptions) => {
      element?.focus(focusOptions);
    },
    [element]
  );

  const blur = useCallback(() => {
    element?.blur();
  }, [element]);

  useEffect(() => {
    if (!element) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    on(element, 'focus', handleFocus);
    on(element, 'blur', handleBlur);

    if (document.activeElement === element) {
      setIsFocused(true);
    }

    return () => {
      off(element, 'focus', handleFocus);
      off(element, 'blur', handleBlur);
    };
  }, [element]);

  return [setRef, focus, blur, isFocused];
}

export default useFocus;
