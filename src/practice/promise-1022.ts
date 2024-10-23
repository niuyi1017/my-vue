type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

const promiseAll = <T extends readonly unknown[]>(promiseArr: readonly [...T]): Promise<{ [K in keyof T]: Awaited<T[K]> }> => {
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

// // 示例用法
// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise<string>((resolve) => {
//   setTimeout(resolve, 100, 'foo');
// });

// promiseAll([promise1, promise2, promise3] as const).then(results => {
//   console.log(results); // [3, 42, 'foo']
// }).catch(err => {
//   console.error(err);
// });

export { promiseAll };

// // 示例用法
// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise<string>((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// promiseAll([promise1, promise2])
//   .then(values => {
//     console.log(values); // [3, 42, 'foo']
//   })
//   .catch(error => {
//     console.error(error);
//   });