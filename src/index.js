import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  Provider,
  history,
  useActions,
  useSelectors,
  ReducersProvider,
  api,
  axios,
  retrieveAuthHeaders,
  persistData,
  removeData,
  retrieveData,
  clearAuthHeaders,
  ReactReduxContext,
} from './core/index';

import { setApiBaseUrl } from './core/utils/helpers';

export {
  Provider,
  history,
  useActions,
  useSelectors,
  ReducersProvider,
  api,
  axios,
  retrieveAuthHeaders,
  persistData,
  removeData,
  retrieveData,
  clearAuthHeaders,
  setApiBaseUrl,
  ReactReduxContext,
  call,
  put,
  takeLatest,
  all,
};
