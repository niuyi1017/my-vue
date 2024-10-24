function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Argument must be an array'));
    }

    let resolvedCount = 0;
    const results = [];
    const promisesCount = promises.length;

    if (promisesCount === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          resolvedCount++;
          results[index] = value;
          if (resolvedCount === promisesCount) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        })
    })
  })
}

// 示例
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

promiseAll([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 42, 'foo']
  })
  .catch(error => {
    console.error(error);
  });