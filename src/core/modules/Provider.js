import React from 'react';
import { Provider } from 'react-redux';
import { ReducersProvider } from '../contexts';
import store from '../store/store';
import actions from './actions';
import selectors from './selectors';

export default ({ children }) => {
  return (
    <Provider store={store}>
      <ReducersProvider.Provider value={{ actions, selectors }}>
        {children}
      </ReducersProvider.Provider>
    </Provider>
  );
};
