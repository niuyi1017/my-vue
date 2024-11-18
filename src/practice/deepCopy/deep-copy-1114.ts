const deepCopy = (target: any): any => {
  if (target === null || typeof target !== 'object') {
    return null
  }
  if (Array.isArray(target)) {
    const result = []
    for (const item of target) {
      result.push(deepCopy(item))
    }
  }
  const result: Record<string, any> = {}
  for (const key in target) {
    result[key] = deepCopy(target[key])
  }
  return result
}


export {
  deepCopy
}