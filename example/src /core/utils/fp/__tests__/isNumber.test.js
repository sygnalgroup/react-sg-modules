import isNumber from '../isNumber';

describe('isNumber', () => {
  it('returns false when value is a string', () => {
    expect(isNumber('1')).toBeFalsy();
  });

  it('returns false when value is a function', () => {
    expect(isNumber(() => '1')).toBeFalsy();
  });

  it('returns false when value is an array', () => {
    expect(isNumber([1, 2])).toBeFalsy();
  });

  it('returns false when value is an object', () => {
    expect(isNumber({ one: 1, two: 2 })).toBeFalsy();
  });

  it('returns true when value is a number', () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(1.2)).toBeTruthy();
    expect(isNumber(-1)).toBeTruthy();
  });
});
