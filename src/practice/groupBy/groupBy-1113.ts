const groupBy = <T>(arr: T[], fn: (item: T) => any): any => {
  return arr.reduce((acc: any, item: T) => {
    const key = fn(item)
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
  }, {})

}

export {
  groupBy
}