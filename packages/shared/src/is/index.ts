export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null;
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val);
}

export function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function';
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined;
}

export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val);
}

export function isNil(val: unknown): val is null | undefined {
  return isNull(val) || isUndefined(val);
}
