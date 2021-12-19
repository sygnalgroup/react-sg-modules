import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import Modules from '../../modules';
import actions from './actions';
import { toSnackCase } from '../utils/helpers';

const reducers = {};

Object.keys(Modules).forEach((module) => {
  const mapActionReducer = {};
  const moduleActions = Modules[module].actions;
  const moduleState = Modules[module].state;
  const { Types } = actions[module];

  Object.keys(moduleActions).forEach((action) => {
    const reducerActionStateStart = (state) => {
      const newKeys = {};
      if (moduleActions[action].state?.start) {
        Object.keys(moduleActions[action].state.start).forEach((param) => {
          newKeys[param] = moduleActions[action].state.start[param];
        });
      }
      return state.merge({ ...newKeys });
    };

    const reducerActionStateSuccess = (state, params) => {
      const newKeys = {};
      if (moduleActions[action].state?.success) {
        Object.keys(moduleActions[action].state.success).forEach((param) => {
          newKeys[param] = moduleActions[action].state.success[param];
        });
      }

      if (moduleActions[action].action?.success) {
        moduleActions[action].action.success.forEach((param) => {
          newKeys[param] = params[param];
        });
      }
      return state.merge({ loading: false, ...newKeys });
    };

    const reducerActionStateError = (state, params) => {
      const newKeys = {};
      if (moduleActions[action].state?.error) {
        Object.keys(moduleActions[action].state.error).forEach((param) => {
          newKeys[param] = moduleActions[action].state.error[param];
        });
      }
      if (moduleActions[action].action?.error) {
        moduleActions[action].action.error.forEach((param) => {
          newKeys[param] = params[param];
        });
      }
      return state.merge({ loading: false, ...newKeys });
    };

    const actionName = toSnackCase(action);

    mapActionReducer[Types[`${actionName.toUpperCase()}_START`]] = reducerActionStateStart;
    mapActionReducer[Types[`${actionName.toUpperCase()}_SUCCESS`]] = reducerActionStateSuccess;
    mapActionReducer[Types[`${actionName.toUpperCase()}_ERROR`]] = reducerActionStateError;
  });

  const INITIAL_STATE = Immutable({ ...moduleState });
  reducers[module] = createReducer(INITIAL_STATE, {
    ...mapActionReducer,
  });
});

export default reducers;
