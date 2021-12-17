/* eslint no-underscore-dangle: "off" */

import createSagaMiddleware, { END } from 'redux-saga'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducers from './rootReducers'
import rootSaga from './rootSaga'
import history from './history'
import { storeMiddlewares } from '../../modules'

const reducers = rootReducers(history)

const middlewares = []
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = process.env.REACT_APP_LOGGING_ENABLED
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const storeAppMiddlewares = storeMiddlewares(history)
if (storeAppMiddlewares.length > 0) {
  storeAppMiddlewares.forEach((el) => {
    middlewares.push(el)
  })
}
middlewares.push(sagaMiddleware)

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

store.runSaga = sagaMiddleware.run
store.runSaga(rootSaga)
store.close = () => store.dispatch(END)

export default store
