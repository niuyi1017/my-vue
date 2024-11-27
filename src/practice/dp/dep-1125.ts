const lengthOfLIS = (list: any[]): number => {
  if (list.length === 0) {
    return 0
  }

  let dp = new Array(list.length).fill(1)
  for (let i = 1; i < list.length; i++) {
    for (let j = 0; j < i; j++) {
      if (list[i] > list[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)


}

const lengthOfLCIS = <T>(list: T[]): number => {
  if (list.length === 0) {
    return 0
  }

  let currentLength = 1
  let maxLength = 1


  return maxLength
}

export {
  lengthOfLIS,
  lengthOfLCIS
}