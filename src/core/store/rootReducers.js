import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reducers from '../modules/reducers'

const rootReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers
  })

export default rootReducers
