import { combineReducers } from 'redux';
import { connectRouter } from '../../modules';
import appReducers from '../modules/reducers';

const reducers = (history) => {
  if (!connectRouter) {
    return { ...appReducers };
  }

  return { router: connectRouter(history), ...appReducers };
};

const rootReducers = (history) => combineReducers(reducers(history));

export default rootReducers;
