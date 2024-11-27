const flattenObject = (obj: any) => {
  const result: any = {}
  let rootKey = ''

  const flatten = (target: any) => {
    for (const key in target) {
      const value = target[key]
      let _key = rootKey + key
      if (typeof value !== 'object') {

        result[_key] = value

      } else {
        rootKey = _key + '.'
        flatten(target[key])
      }
    }
  }
  flatten(obj)
  console.log(result)
  return result
}

export {
  flattenObject
}