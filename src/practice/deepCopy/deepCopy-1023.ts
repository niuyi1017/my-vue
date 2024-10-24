const deepCopy = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copyArr: any[] = [];
  for (let i = 0; i < obj.length; i++) {
    copyArr[i] = deepCopy(obj[i]);
    }
  return copyArr as unknown as T;
  }

  const copyObj: {[key: string]: any } = { };
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
    copyObj[key] = deepCopy((obj as { [key: string]: any })[key]);
    }
  }
  return copyObj as T;
};

  export {
    deepCopy
  };