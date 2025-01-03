const flatten = <T>(arr: T[]): T[] => {

  const result: T[] = []

  const _flatten = (_arr: any) => {

    for (const item of _arr) {
      if (Array.isArray(item)) {
        _flatten(item)
      } else {
        result.push(item)
      }
    }
  }
  _flatten(arr)

  return result

}