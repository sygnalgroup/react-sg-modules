export function persistData(key, value) {
  if (value === 'batch-request') {
    return
  }

  if (!localStorage) {
    console.warn('"window.localStorage" not found. Data will not be persisted.')
    return
  }

  localStorage.setItem(key, value)
}

export function retrieveData(key) {
  return localStorage && localStorage.getItem(key)
}

export function removeData(key) {
  return localStorage && localStorage.removeItem(key)
}
