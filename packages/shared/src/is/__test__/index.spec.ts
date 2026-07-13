import { describe, expect, test } from 'vitest';
import { isBoolean, isObject, isArray, isFunction, isNull, isUndefined, isNumber, isNil } from '..';

describe('is', () => {
  describe('isBoolean', () => {
    test('should return true for boolean values', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    test('should return false for non-boolean values', () => {
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    test('should return true for objects and arrays', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    test('should return false for null and primitives', () => {
      expect(isObject(null)).toBe(false); // 关键边界测试
      expect(isObject(undefined)).toBe(false);
      expect(isObject('string')).toBe(false);
    });
  });

  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
    });

    test('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('array')).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });

  describe('isFunction', () => {
    test('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(Array)).toBe(true);
    });

    test('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe('isNull & isUndefined', () => {
    test('isNull should strictly check for null', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false); // 关键边界测试
      expect(isNull('')).toBe(false);
    });

    test('isUndefined should strictly check for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false); // 关键边界测试
      expect(isUndefined(0)).toBe(false);
    });
  });

  describe('isNumber', () => {
    test('should return true for valid numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
    });

    test('should return false for NaN and non-numbers', () => {
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber('123')).toBe(false);
      expect(isNumber(null)).toBe(false);
    });
  });

  describe('isNil', () => {
    test('should return true for null or undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    test('should return false for other falsy values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
    });
  });
});
