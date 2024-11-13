
const deepCopy = <T>(target: T): T => {
  if (target === null || typeof target !== 'object') {
    return target
  }

  if (Array.isArray(target)) {
    const result = []
    for (const item of target) {
      result.push(deepCopy(item))
    }
    return result as T
  }

  const resultObj = {} as T
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      resultObj[key] = deepCopy(target[key])
    }
  }
  return resultObj
}

export {
  deepCopy
}