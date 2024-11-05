const flatten = <T>(arr: T[]): T[] => {
  const resultArr: T[] = []

  const _flatten = (_arr: T[]) => {
    for (const item of _arr) {
      if (Array.isArray(item)) {
        _flatten(item)
      } else {
        resultArr.push(item)
      }
    }
  }

  _flatten(arr)
  return resultArr
}

export {
  flatten
}