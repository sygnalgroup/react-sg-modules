import { removeData } from '../utils/session-storage'
import { clearAuthHeaders } from './auth-headers'

export const buildError = (response) => {
  const statusCode = response ? response.status : null
  const errors = response && response.data ? { ...response.data.errors } : {}

  if (statusCode === 401) {
    clearAuthHeaders(removeData)
  }
  return {
    body: { errors },
    statusCode
  }
}

const getErrors = (error) =>
  error && error.body && error.body.errors
    ? error.body.errors
    : { error: ['There was an error'] }

export const getErrorMessage = (error) => {
  return Object.values(getErrors(error)).join('. ') || 'There was an error'
}
