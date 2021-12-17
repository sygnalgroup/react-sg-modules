import isNotPresent from '../isNotPresent';

describe('isNotPresent', () => {
  it('returns false when value is a empty string', () => {
    expect(isNotPresent('')).toBeTruthy();
  });

  it('returns false when value is an null', () => {
    expect(isNotPresent(null)).toBeTruthy();
  });

  it('returns false when value undefined', () => {
    expect(isNotPresent(undefined)).toBeTruthy();
  });

  it('returns false when value is and empty object', () => {
    expect(isNotPresent({})).toBeTruthy();
  });

  it('returns false when value is and empty array', () => {
    expect(isNotPresent([])).toBeTruthy();
  });

  it('returns true when value is a Present', () => {
    expect(isNotPresent(1)).toBeFalsy();
    expect(isNotPresent('saf')).toBeFalsy();
    expect(isNotPresent({ name: 'saf' })).toBeFalsy();
    expect(isNotPresent(['saf'])).toBeFalsy();
  });
});
