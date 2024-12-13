

const promiseAll = <T>(arr: (T | Promise<T>)[]): Promise<T[]> => {
 
  return new Promise((resolve,reject) => {
    const result :T[] = []
    let count = 0

    if(arr.length === 0){
      resolve(result)
    }

    arr.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        count++
        result[index] = res
        if(count === arr.length){
          resolve(result)
        }

      }).catch(err => {
        reject(err)
      })
    })

  })

}