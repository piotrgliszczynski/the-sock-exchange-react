import add from './math';

describe('add function', () => {
  test('adds two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds negatvie numbers correctly', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test('adds zero correctly', () => {
    expect(add(0, 5)).toBe(5);
  });

  test('works with floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
})