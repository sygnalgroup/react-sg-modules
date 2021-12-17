import { isWithin } from '../../utils/fp'

const in200s = isWithin(200, 299)

const evolveResponse = (response) => ({
  ...response,
  ok: in200s(response.status)
})

export default evolveResponse
