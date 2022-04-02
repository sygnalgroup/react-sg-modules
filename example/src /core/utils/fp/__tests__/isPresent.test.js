import isPresent from '../isPresent';

describe('isPresent', () => {
  it('returns false when value is a empty string', () => {
    expect(isPresent('')).toBeFalsy();
  });

  it('returns false when value is null', () => {
    expect(isPresent(null)).toBeFalsy();
  });

  it('returns false when value undefined', () => {
    expect(isPresent(undefined)).toBeFalsy();
  });

  it('returns false when value is an empty object', () => {
    expect(isPresent({})).toBeFalsy();
  });

  it('returns false when value is an empty array', () => {
    expect(isPresent([])).toBeFalsy();
  });

  it('returns true when value is valid', () => {
    expect(isPresent(1)).toBeTruthy();
    expect(isPresent('saf')).toBeTruthy();
    expect(isPresent({ name: 'saf' })).toBeTruthy();
    expect(isPresent(['saf'])).toBeTruthy();
  });
});
