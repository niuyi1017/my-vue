function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}


function uniqueArrayByMap<T>(arr: T[]): T[] {
  const map = new Map<T, boolean>();
  return arr.filter((item) => !map.has(item) && map.set(item, true));
}

function uniqueArrayByIndexOf<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}


export {
  uniqueArray,
  uniqueArrayByMap,
  uniqueArrayByIndexOf
};