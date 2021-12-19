import { persistData } from './session-storage';

export const toSnackCase = (value) => {
  return value.replace(/[A-Z]/g, (val) => `_${val.toLowerCase()}`).replace(/^_/, '');
};

export const setApiBaseUrl = (url) => {
  persistData('SG_MODULE_BASE_URL_API', url);
};

export const sgModule = (moduleName, module) => {
  const newModule = module;
  const newActions = module.actions;
  Object.keys(newActions).forEach((key) => {
    newActions[key].module = moduleName;
    newActions[key].name = key;
  });
  newModule.actions = newActions;
  return module;
};
