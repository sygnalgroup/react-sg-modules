import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  Provider,
  history,
  useActions,
  useSelectors,
  api,
  axios,
  retrieveAuthHeaders,
  persistData,
  removeData,
  retrieveData,
  clearAuthHeaders,
  ReactReduxContext,
  ReducersProvider,
} from './core/index';

import { setApiBaseUrl } from './core/utils/helpers';

export {
  Provider, // main provider
  useActions, // hook to dispatch the reducers ations
  useSelectors, // hook to get the store states
  history, // history form the project
  api, // axios api with intercepetors, persist headers and convert to camelCase the responses
  axios, // axios instance
  retrieveAuthHeaders, // retrieve all auth headers
  persistData, // persist data localstorage
  removeData, // remove data localstorage
  retrieveData, // retrieve data localstorage
  clearAuthHeaders, // clear all auth from the headers
  setApiBaseUrl, // set base url from your api
  // METHOD redux-sagas
  call,
  put,
  takeLatest,
  all,
  ReactReduxContext,
  ReducersProvider,
};
