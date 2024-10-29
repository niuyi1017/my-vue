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

export {
  flattenArray
}

// 示例用法
// const nestedArray = [1, [2, [3, [4, 5]], 6], 7];
// const flatArray = flattenArray(nestedArray);
// console.log(flatArray); // 输出: [1, 2, 3, 4, 5, 6, 7]