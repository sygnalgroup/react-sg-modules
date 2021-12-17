import axios from 'axios'
import humps from 'humps'

import { retrieveData } from 'core/utils/session-storage'
import { retrieveAuthHeaders } from './auth-headers'
import evolveResponse from './interceptors/evolve-response'
import persistHeaders from './interceptors/persist-headers'
import parseResponse from './interceptors/parse-response'
import parseError from './interceptors/parse-error'

const BASE_URL_API = 'http://localhost:3000/api/v1'

const api = axios.create({
  baseURL: BASE_URL_API
})

api.interceptors.request.use((request) => {
  // Retrieve persisted headers and set in the new API instance
  const authHeaders = retrieveAuthHeaders(retrieveData)()
  let { data } = request

  if (!(data instanceof FormData)) {
    data = humps.decamelizeKeys(request.data)
  }

  return {
    ...request,
    params: request.params ? humps.decamelizeKeys(request.params) : {},
    data,
    headers: {
      ...request.headers,
      ...authHeaders,
      'Access-Control-Allow-Credentials': true
    }
  }
})

api.interceptors.response.use(evolveResponse)
api.interceptors.response.use(persistHeaders)
api.interceptors.response.use(parseResponse, parseError)

export default api
