"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const reactive_1024_1 = require("../src/practice/reactive/reactive-1024");
(0, globals_1.describe)('reactive', () => {
    (0, globals_1.test)('should track and trigger effects', () => {
        const obj = (0, reactive_1024_1.reactive)({ count: 0 });
        let dummy;
        (0, reactive_1024_1.effect)(() => {
            dummy = obj.count;
        });
        (0, globals_1.expect)(dummy).toBe(0);
        obj.count = 1;
        (0, globals_1.expect)(dummy).toBe(1);
    });
    (0, globals_1.test)('should handle multiple properties', () => {
        const obj = (0, reactive_1024_1.reactive)({ count: 0, name: 'test' });
        let countDummy, nameDummy;
        (0, reactive_1024_1.effect)(() => {
            countDummy = obj.count;
        });
        (0, reactive_1024_1.effect)(() => {
            nameDummy = obj.name;
        });
        (0, globals_1.expect)(countDummy).toBe(0);
        (0, globals_1.expect)(nameDummy).toBe('test');
        obj.count = 1;
        (0, globals_1.expect)(countDummy).toBe(1);
        (0, globals_1.expect)(nameDummy).toBe('test');
        obj.name = 'changed';
        (0, globals_1.expect)(countDummy).toBe(1);
        (0, globals_1.expect)(nameDummy).toBe('changed');
    });
    (0, globals_1.test)('should not trigger effects for non-tracked properties', () => {
        const obj = (0, reactive_1024_1.reactive)({ count: 0, name: 'test' });
        let dummy;
        (0, reactive_1024_1.effect)(() => {
            dummy = obj.count;
        });
        (0, globals_1.expect)(dummy).toBe(0);
        obj.name = 'changed';
        (0, globals_1.expect)(dummy).toBe(0);
    });
    (0, globals_1.test)('should handle nested reactivity', () => {
        const obj = (0, reactive_1024_1.reactive)({ nested: { count: 0 } });
        let dummy;
        (0, reactive_1024_1.effect)(() => {
            dummy = obj.nested.count;
        });
        (0, globals_1.expect)(dummy).toBe(0);
        obj.nested.count = 1;
        (0, globals_1.expect)(dummy).toBe(1);
    });
});
