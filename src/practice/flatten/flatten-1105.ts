const flatten = (arr: any): any => {
  const result = []

  const _flatten = (_arr: any) => {
    for (const item in _arr) {
      if (Array.isArray(item)) {
        _flatten(item)
      } else {
        result.push(item)
      }
    }
  }

  return flatten


}

export {
  flatten
}