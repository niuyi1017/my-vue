const groupBy = (arr: any, fn: any) => {
  const result: any = {}
  arr.reduce((acc: any, item: any) => {
    const key = fn(item)
    if (!result[key]) {
      result[key] = []
    }
    result[key].push(item)
  }, {})
  return result
}