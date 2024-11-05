function promiseAll<T>(arr: (T | Promise<T>)[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result: T[] = [];
    let count = 0;

    if (arr.length === 0) {
      resolve(result);
      return;
    }

    arr.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        result[index] = res;
        count++;
        if (count === arr.length) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  });
}

export {
  promiseAll
}