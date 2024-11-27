function flattenArray(arr: any[]): any[] {
  const result: any[] = [];

  const flatten = (input: any[]) => {
    for (const item of input) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  };

  flatten(arr);
  return result;
}

const flattenObject = (obj: any): any => {
  const result: any = {};

  const flatten = (input: any, prefix = '') => {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          flatten(value, `${prefix}${key}.`);
        } else {
          result[`${prefix}${key}`] = value;
        }
      }
    }
  };

  flatten(obj);
  return result;
}


export {
  flattenArray,
  flattenObject
}

// 示例用法
// const nestedArray = [1, [2, [3, [4, 5]], 6], 7];
// const flatArray = flattenArray(nestedArray);
// console.log(flatArray); // 输出: [1, 2, 3, 4, 5, 6, 7]