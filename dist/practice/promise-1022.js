"use strict";
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
// 示例用法
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});
promiseAll([promise1, promise2])
    .then(values => {
    console.log(values); // [3, 42, 'foo']
})
    .catch(error => {
    console.error(error);
});
