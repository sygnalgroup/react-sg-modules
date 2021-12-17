import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ReducersProvider } from '../contexts'
import store from '../store/store'
import actions from './actions'
import selectors from './selectors'
import { history } from '../..'

export default ({ children }) => {
  return (
    <Provider store={store}>
      <ReducersProvider.Provider value={{ actions, selectors }}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </ReducersProvider.Provider>
    </Provider>
  )
}
