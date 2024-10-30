
const promiseAll = (promiseArr:any) => {
  return new Promise((resolve, reject) => {
    if(Array.isArray(promiseAll)){
      const result:any = []
      let count = 0
      promiseArr.forEach( (promise:any, index:number) => {
        Promise.resolve(promise).then(res => {
          result[index] = res
          count++
          if(count === promiseArr.length){
            resolve(result)
          }
          
        }).catch(err => {
          reject(err)
        })
      })
    }else{
      reject(new TypeError('not arr'))
    }
  })
}

export {
  promiseAll
}