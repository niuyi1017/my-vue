
const promiseAll = (arr: any[]) => {

  return new Promise((resolve, reject) => {
    const result: any = []
    let count = 0
    if (arr && arr.length) {
      arr.forEach((promise, index) => {
        Promise.resolve(promise).then(res => {
          result[index] = res
          count++
          if (count === arr.length) {
            resolve(result)
          }
        }).catch(err => {
          reject(err)
        })
      })
    } else {
      resolve([])
    }
  })
}

export {
  promiseAll
}