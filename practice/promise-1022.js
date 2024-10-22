const promiseAll = (promiseArr) => {
  return new Promise((resolve, reject) => {
    if (Array.isArray(promiseArr)) {

      if (promiseArr.length === 0) {
        resolve([])
      }

      const resultList = []
      let resolvedCount = 0
      promiseArr.forEach((promise, index) => {
        Promise.resolve(promise).then(value => {
          resolvedCount++
          resultList[index] = value
          if (resolvedCount === promiseArr.length) {
            resolve(resultList)
          }
        }).catch(err => {
          reject(err)
        })
      })
    } else {
      reject('not arr')
    }
  })
}