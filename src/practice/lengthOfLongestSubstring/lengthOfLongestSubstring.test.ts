import { lengthOfLongestSubstring } from './lengthOfLongestSubstring';
import { describe, expect, test } from '@jest/globals';

describe('lengthOfLongestSubstring', () => {
  test('should return 3 for "abcabcbb"', () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
  });

  test('should return 1 for "bbbbb"', () => {
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  });

  test('should return 3 for "pwwkew"', () => {
    expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
  });

  test('should return 0 for empty string', () => {
    expect(lengthOfLongestSubstring("")).toBe(0);
  });

  test('should return 5 for "tmmzuxt"', () => {
    expect(lengthOfLongestSubstring("tmmzuxt")).toBe(5);
  });

  test('should return 7 for "abcdefg"', () => {
    expect(lengthOfLongestSubstring("abcdefg")).toBe(7);
  });
});