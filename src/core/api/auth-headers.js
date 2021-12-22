import { authHeaders } from '../../modules';

export const getAuthHeaders = () => {
  return authHeaders || ['uid', 'access-token', 'expiry', 'client'];
};

export function retrieveAuthHeaders(retrieveData) {
  return () => {
    if (!retrieveData) {
      return null;
    }

    const headers = {};
    const headersKeys = getAuthHeaders();
    headersKeys.forEach((key) => {
      headers[key] = retrieveData(key);
    });

    return headersKeys;
  };
}

export function persistAuthHeaders(persistData) {
  return (headers) => {
    if (!persistData || !headers) {
      return;
    }

    const headersKeys = getAuthHeaders();
    headersKeys.forEach((key) => {
      persistData(key, headers[key]);
    });
  };
}

export function clearAuthHeaders(removeData) {
  return () => {
    if (!removeData) {
      return;
    }

    const headersKeys = getAuthHeaders();
    headersKeys.forEach((key) => {
      removeData(key);
    });
  };
}
