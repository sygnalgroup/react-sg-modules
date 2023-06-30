/* eslint-disable consistent-return */
import { getAuthHeaders } from '../auth-headers';
import { persistData } from '../../utils/session-storage';

const persistHeaders = (response) => {
  if (response.ok) {
    const headersKeys = getAuthHeaders();
    headersKeys.forEach((key) => {
      if (response.headers[key]) {
        persistData(key, response.headers[key]);
        return response;
      }
    });
  }

  return response;
};

export default persistHeaders;
