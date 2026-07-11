import { useState, useMemo } from 'react';

export interface BooleanActions {
  // 设置为 true
  setTrue: () => void;
  // 设置为 false
  setFalse: () => void;
  // 切换值
  toggle: () => void;
  // 设置为指定值
  set: (value: boolean) => void;
}
function useBoolean(initialValue = false): [boolean, BooleanActions] {
  const [value, setValue] = useState(initialValue);
  const actions = useMemo(
    () => ({
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: () => setValue(!value),
      set: (value: boolean) => setValue(value),
    }),
    [value]
  );
  return [value, actions];
}
export default useBoolean;
