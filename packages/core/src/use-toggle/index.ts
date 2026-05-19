import { isBoolean, isUndefined } from '@sober/react-use-shared';
import { useCallback, useState } from 'react';

function useToggle<T = boolean>(
  defaultValue: T = false as unknown as T
): [T, (nextValue?: T | boolean) => void] {
  const [state, setState] = useState<T>(defaultValue);

  const toggle = useCallback(
    (nextValue?: T | boolean) => {
      if (isBoolean(nextValue)) {
        setState(nextValue as T);
      } else if (!isUndefined(nextValue)) {
        setState(nextValue);
      } else {
        setState((prev) => {
          return (isBoolean(prev) ? !prev : defaultValue) as T;
        });
      }
    },
    [defaultValue]
  );
  return [state, toggle];
}

export default useToggle;
