"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepCopy_1031_1 = require("../src/practice/deepCopy/deepCopy-1031");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('deepCopy', () => {
    (0, globals_1.test)('should return null if input is null', () => {
        (0, globals_1.expect)((0, deepCopy_1031_1.deepCopy)(null)).toBeNull();
    });
    (0, globals_1.test)('should return the same primitive value if input is a primitive', () => {
        (0, globals_1.expect)((0, deepCopy_1031_1.deepCopy)(42)).toBe(42);
        (0, globals_1.expect)((0, deepCopy_1031_1.deepCopy)('hello')).toBe('hello');
        (0, globals_1.expect)((0, deepCopy_1031_1.deepCopy)(true)).toBe(true);
    });
    (0, globals_1.test)('should create a deep copy of an array', () => {
        const arr = [1, 2, { a: 3 }];
        const copiedArr = (0, deepCopy_1031_1.deepCopy)(arr);
        (0, globals_1.expect)(copiedArr).toEqual(arr);
        (0, globals_1.expect)(copiedArr).not.toBe(arr);
        (0, globals_1.expect)(copiedArr[2]).not.toBe(arr[2]);
    });
    (0, globals_1.test)('should create a deep copy of an object', () => {
        const obj = { a: 1, b: { c: 2 } };
        const copiedObj = (0, deepCopy_1031_1.deepCopy)(obj);
        (0, globals_1.expect)(copiedObj).toEqual(obj);
        (0, globals_1.expect)(copiedObj).not.toBe(obj);
        (0, globals_1.expect)(copiedObj.b).not.toBe(obj.b);
    });
    (0, globals_1.test)('should handle nested objects and arrays', () => {
        const complexObj = { a: [1, 2, { b: 3 }], c: { d: 4, e: [5, 6] } };
        const copiedComplexObj = (0, deepCopy_1031_1.deepCopy)(complexObj);
        (0, globals_1.expect)(copiedComplexObj).toEqual(complexObj);
        (0, globals_1.expect)(copiedComplexObj).not.toBe(complexObj);
        (0, globals_1.expect)(copiedComplexObj.a).not.toBe(complexObj.a);
        (0, globals_1.expect)(copiedComplexObj.a[2]).not.toBe(complexObj.a[2]);
        (0, globals_1.expect)(copiedComplexObj.c).not.toBe(complexObj.c);
        (0, globals_1.expect)(copiedComplexObj.c.e).not.toBe(complexObj.c.e);
    });
});
