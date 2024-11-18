function longestPalindrome(s: string): string {
  if (s.length < 2) return s;

  let start = 0, maxLength = 1;

  function expandAroundCenter(left: number, right: number) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > maxLength) {
      start = left + 1;
      maxLength = right - left - 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // 奇数长度
    expandAroundCenter(i, i + 1); // 偶数长度
  }

  return s.substring(start, start + maxLength);
}

// 示例用法
console.log(longestPalindrome("babad"));

export {
  longestPalindrome
}