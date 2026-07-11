import { isBoolean } from '@sober/react-use-shared';
import { useCallback, useState } from 'react';

/**
 * 切换状态的hooks
 * @param defaultValue 默认值
 * @param reverseValue 反转值
 */
function useToggle<T, R = T>(defaultValue: T, reverseValue: R): [T | R, () => void];
/**
 * 切换状态的hooks
 * @param defaultValue 默认值 ，默认false
 */
function useToggle<T = boolean>(defaultValue?: T): [T | boolean, () => void];

function useToggle<T, R = T>(...args: [defaultValue?: T | boolean, reverseValue?: R]) {
  const defaultValue = args.length >= 1 ? args[0] : false;
  const reverseValue = args.length >= 2 ? args[1] : defaultValue;
  const hasReverseValue = args.length >= 2;

  const actualReverseValue = hasReverseValue
    ? reverseValue
    : isBoolean(defaultValue)
      ? !defaultValue
      : defaultValue;

  const [state, setState] = useState<T | R | boolean | undefined>(defaultValue);

  const toggle = useCallback(() => {
    setState((prev) => {
      return prev === defaultValue ? actualReverseValue : defaultValue;
    });
  }, [defaultValue, actualReverseValue]);

  return [state, toggle];
}

export default useToggle;
