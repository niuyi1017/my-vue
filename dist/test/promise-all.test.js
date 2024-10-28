"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1022_1 = require("../src/practice/promiseAll/promise-1022");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('promiseAll', () => {
    (0, globals_1.test)('resolves all promises in the array', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise1 = Promise.resolve(3);
        const promise2 = 42;
        const promise3 = new Promise((resolve) => {
            setTimeout(resolve, 100, 'foo');
        });
        const result = yield (0, promise_1022_1.promiseAll)([promise1, promise2, promise3]);
        (0, globals_1.expect)(result).toEqual([3, 42, 'foo']);
    }));
    (0, globals_1.test)('resolves an empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, promise_1022_1.promiseAll)([]);
        (0, globals_1.expect)(result).toEqual([]);
    }));
    (0, globals_1.test)('rejects if any promise rejects', () => __awaiter(void 0, void 0, void 0, function* () {
        const promise1 = Promise.resolve(3);
        const promise2 = Promise.reject('error');
        const promise3 = new Promise((resolve) => {
            setTimeout(resolve, 100, 'foo');
        });
        yield (0, globals_1.expect)((0, promise_1022_1.promiseAll)([promise1, promise2, promise3])).rejects.toEqual('error');
    }));
    (0, globals_1.test)('rejects if input is not an array', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        yield (0, globals_1.expect)((0, promise_1022_1.promiseAll)('not an array')).rejects.toThrow(TypeError);
    }));
});
