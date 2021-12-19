import { persistData } from './session-storage'

export const toSnackCase = (value) => {
  return value
    .replace(/[A-Z]/g, (val) => `_${val.toLowerCase()}`)
    .replace(/^_/, '')
}

export const setApiBaseUrl = (url) => {
  persistData('SG_MODULE_BASE_URL_API', url)
}
