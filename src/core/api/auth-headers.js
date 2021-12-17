export function retrieveAuthHeaders(retrieveData) {
  return () => {
    if (!retrieveData) {
      return null
    }

    return {
      uid: retrieveData('uid'),
      'access-token': retrieveData('access-token'),
      'token-type': retrieveData('token-type'),
      expiry: retrieveData('expiry'),
      client: retrieveData('client')
    }
  }
}

export function persistAuthHeaders(persistData) {
  return (headers) => {
    if (!persistData || !headers) {
      return
    }
    persistData('uid', headers.uid)
    persistData('access-token', headers['access-token'])
    persistData('expiry', headers.expiry)
    persistData('client', headers.client)
  }
}

export function clearAuthHeaders(removeData) {
  return () => {
    if (!removeData) {
      return
    }

    removeData('uid')
    removeData('access-token')
    removeData('expiry')
    removeData('client')
  }
}
