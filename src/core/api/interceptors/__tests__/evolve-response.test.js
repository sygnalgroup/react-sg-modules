import evolveResponse from '../evolve-response';

describe('evolveResponse', () => {
  it('is true when response.status is within 200 and 299', () => {
    const response = evolveResponse({
      status: 200,
    });

    expect(response.ok).toBeTruthy();
  });

  it('is false when response.status is less than 200', () => {
    const response = evolveResponse({
      status: 199,
    });

    expect(response.ok).toBeFalsy();
  });

  it('is false when response.status is greater than 299', () => {
    const response = evolveResponse({
      status: 300,
    });

    expect(response.ok).toBeFalsy();
  });
});
