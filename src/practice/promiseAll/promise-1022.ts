type Awaited<T> = T extends Promise<infer U> ? U : T;

// 定义一个泛型函数 promiseAll，用于处理一组 Promise 并返回它们的解析结果
const promiseAll = <T extends readonly unknown[] >(promiseArr: readonly [...T]): Promise<{ [K in keyof T]: Awaited<T[K]> }> => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promiseArr)) {
      if (promiseArr.length === 0) {
        resolve([] as any);
        return;
      }

      const resultList: any[] = [];
      let resolvedCount = 0;

      promiseArr.forEach((promise, index) => {
        Promise.resolve(promise).then(value => {
          resolvedCount++;
          resultList[index] = value;
          if (resolvedCount === promiseArr.length) {
            resolve(resultList as { [K in keyof T]: Awaited<T[K]> });
          }
        }).catch(err => {
          reject(err);
        });
      });
    } else {
      reject(new TypeError('Argument is not an array'));
    }
  });
};



export { promiseAll };

