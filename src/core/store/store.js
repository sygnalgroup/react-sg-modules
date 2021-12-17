/* eslint no-underscore-dangle: "off" */

import createSagaMiddleware, { END } from 'redux-saga'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducers from './rootReducers'
import rootSaga from './rootSaga'
import history from './history'

const reducers = rootReducers(history)

const middlewares = []
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = process.env.REACT_APP_LOGGING_ENABLED
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

middlewares.push(routerMiddleware(history))
middlewares.push(sagaMiddleware)

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

store.runSaga = sagaMiddleware.run
store.runSaga(rootSaga)
store.close = () => store.dispatch(END)

export default store
