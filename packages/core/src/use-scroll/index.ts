import { type RefObject, useEffect } from 'react';
import { off, on, isObject, isNull } from '@gysober/react-use-shared';
import useRafState from '../use-raf-state';

export interface ScrollState {
  x: number;
  y: number;
}

function useScroll(ref: RefObject<HTMLElement | null>): ScrollState {
  if (process.env.NODE_ENV === 'development') {
    if (!isObject(ref) || isNull(ref) || typeof ref.current === 'undefined') {
      console.error('`useScroll` expects a single ref argument.');
    }
  }
  const [state, setState] = useRafState<ScrollState>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    on(node, 'scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      off(node, 'scroll', handler);
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}

export default useScroll;
