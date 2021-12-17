export const toSnackCase = (value) => {
  return value
    .replace(/[A-Z]/g, (val) => `_${val.toLowerCase()}`)
    .replace(/^_/, '')
}
