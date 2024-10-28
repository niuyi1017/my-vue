"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseAll = void 0;
// 定义一个泛型函数 promiseAll，用于处理一组 Promise 并返回它们的解析结果
const promiseAll = (promiseArr) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(promiseArr)) {
            if (promiseArr.length === 0) {
                resolve([]);
                return;
            }
            const resultList = [];
            let resolvedCount = 0;
            promiseArr.forEach((promise, index) => {
                Promise.resolve(promise).then(value => {
                    resolvedCount++;
                    resultList[index] = value;
                    if (resolvedCount === promiseArr.length) {
                        resolve(resultList);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        }
        else {
            reject(new TypeError('Argument is not an array'));
        }
    });
};
exports.promiseAll = promiseAll;
