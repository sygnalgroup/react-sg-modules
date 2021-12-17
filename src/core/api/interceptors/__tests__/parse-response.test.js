import parseResponse from '../parse-response';

describe('parse-respones', () => {
  it('should handle successful responses', () => {
    const response = { ok: true, status: 200, data: { data: { id: 1 } } };
    const newResponse = parseResponse(response);

    expect(newResponse.data).toEqual({ id: 1 });
  });

  it('should camelize keys for 2xx responses', () => {
    const response = {
      ok: true,
      status: 200,
      data: { data: { account_id: 1 } },
    };
    const newResponse = parseResponse(response);

    expect(newResponse.data).toEqual({ accountId: 1 });
  });
});
