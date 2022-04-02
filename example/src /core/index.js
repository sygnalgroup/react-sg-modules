import axios from 'axios';
import { ReactReduxContext } from 'react-redux';
import Provider from './modules/Provider';
import history from './store/history';
import useActions from './modules/useActions';
import useSelectors from './modules/useSelectors';
import { retrieveAuthHeaders, clearAuthHeaders } from './api/auth-headers';
import { persistData, removeData, retrieveData } from './utils/session-storage';
import { ReducersProvider } from './contexts';
import api from './api';

export {
  Provider,
  history,
  useSelectors,
  useActions,
  ReducersProvider,
  axios,
  api,
  retrieveAuthHeaders,
  persistData,
  removeData,
  retrieveData,
  clearAuthHeaders,
  ReactReduxContext,
};
