import humps from 'humps'
import { path } from 'ramda'

const getData = (data) => (data && data.data ? data.data : data)

const parseResponse = (response) => {
  const isS3Presign = response.config.url.match('/s3/sign')
  if (response.ok && !response.data.errors && !isS3Presign) {
    return {
      ...response,
      data: humps.camelizeKeys(getData(response.data)),
      pagination: humps.camelizeKeys(getData(response.data.pagination)),
      meta: path(['data', 'meta'], response)
    }
  }

  return response
}

export default parseResponse
