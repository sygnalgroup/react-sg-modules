/* eslint-disable consistent-return */
import { getAuthHeaders, persistAuthHeaders } from '../auth-headers';
import { persistData } from '../../utils/session-storage';

const persistHeaders = (response) => {
  if (response.ok) {
    const headersKeys = getAuthHeaders();
    headersKeys.forEach((key) => {
      if (response.headers[key]) {
        persistAuthHeaders(persistData)(response.headers);
        return response;
      }
    });
  }

  return response;
};

export default persistHeaders;
