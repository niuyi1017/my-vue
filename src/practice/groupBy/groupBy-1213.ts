const groupBy = (arr:any[], fn:(item:any) => any) => {
  arr.reduce((acc, item) => {
    const key = fn(item)
    if(acc[key]){
      acc[key].push(item)
    }else{
      acc[key] = [item]
    }
    return acc
  }, {})

}

export {
  groupBy
}