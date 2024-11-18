import { longestPalindrome } from './longestPalindrome';
import { describe, expect, test } from '@jest/globals';

describe('longestPalindrome', () => {
  test('should return the longest palindromic substring for a given string', () => {
    expect(longestPalindrome('babad')).toBe('bab'); // 'aba' is also a valid answer
    expect(longestPalindrome('cbbd')).toBe('bb');
    expect(longestPalindrome('a')).toBe('a');
    expect(longestPalindrome('ac')).toBe('a'); // 'c' is also a valid answer
  });

  test('should handle empty string', () => {
    expect(longestPalindrome('')).toBe('');
  });

  test('should handle string with all identical characters', () => {
    expect(longestPalindrome('aaaa')).toBe('aaaa');
  });

  test('should handle string with no palindromic substring longer than 1', () => {
    expect(longestPalindrome('abc')).toBe('a'); // 'b' or 'c' are also valid answers
  });
});