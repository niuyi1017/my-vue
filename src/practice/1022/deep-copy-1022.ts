function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arrCopy: any[] = [];
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepCopy(obj[i]);
    }
    return arrCopy as unknown as T;
  }

  const objCopy: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = deepCopy(obj[key]);
    }
  }
  return objCopy as T;
}