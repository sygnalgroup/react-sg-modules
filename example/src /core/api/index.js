import axios from 'axios';
import humps from 'humps';

import { retrieveData } from '../utils/session-storage';
import { retrieveAuthHeaders } from './auth-headers';
import evolveResponse from './interceptors/evolve-response';
import persistHeaders from './interceptors/persist-headers';
import parseResponse from './interceptors/parse-response';
import parseError from './interceptors/parse-error';

const api = axios.create({
  baseURL: retrieveData('SG_MODULE_BASE_URL_API'),
});

api.interceptors.request.use((request) => {
  // Retrieve persisted headers and set in the new API instance
  const authHeaders = retrieveAuthHeaders(retrieveData)();
  let { data } = request;

  if (!(data instanceof FormData)) {
    data = humps.decamelizeKeys(request.data);
  }

  const headersAuthRequest = {};
  Object.keys(authHeaders).forEach((key) => {
    if (authHeaders[key]) {
      headersAuthRequest[key] = authHeaders[key];
    }
  });
  return {
    ...request,
    params: request.params ? humps.decamelizeKeys(request.params) : {},
    data,
    headers: {
      ...request.headers,
      ...headersAuthRequest,
    },
  };
});

api.interceptors.response.use(evolveResponse);
api.interceptors.response.use(persistHeaders);
api.interceptors.response.use(parseResponse, parseError);

export default api;
