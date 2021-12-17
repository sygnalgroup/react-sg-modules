import isWithin from '../isWithin';

describe('isWithin', () => {
  const min = 10;
  const max = 20;
  const in10s = isWithin(min, max);

  it('returns true if number is greater than minimum value', () => {
    expect(in10s(11)).toBeTruthy();
  });

  it('returns true if number is equal to minimum value', () => {
    expect(in10s(10)).toBeTruthy();
  });

  it('returns true if number is less than maximum value', () => {
    expect(in10s(19)).toBeTruthy();
  });

  it('returns true if number is equal to maximum value', () => {
    expect(in10s(20)).toBeTruthy();
  });

  it('returns false if number is less than minimum value', () => {
    expect(in10s(9)).toBeFalsy();
  });

  it('returns false if number is greater than maximum value', () => {
    expect(in10s(21)).toBeFalsy();
  });

  it('returns false if value is not a number', () => {
    expect(in10s('12')).toBeFalsy();
  });
});
