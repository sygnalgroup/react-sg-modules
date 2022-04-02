import { persistAuthHeaders } from '../auth-headers';
import { persistData } from '../../utils/session-storage';

const persistHeaders = (response) => {
  if (response.ok) {
    if (response.headers['access-token']) {
      persistAuthHeaders(persistData)(response.headers);
    }
  }

  return response;
};

export default persistHeaders;
