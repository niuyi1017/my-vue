const flattenArray = <T>(list: T[]): T[] => {
  const result: T[] = []

  const flatten = (_arr: T[]) => {
    for (const item of list) {
      if (Array.isArray(item)) {
        flatten(item)
      } else {
        result.push(item)
      }
    }
  }

  return result

}

export {
  flattenArray
}