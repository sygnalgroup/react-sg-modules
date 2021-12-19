import { createActions } from 'reduxsauce';
import Modules from '../../modules';

const actionsModules = {};
const actions = {};

Object.keys(Modules).forEach((module) => {
  const actionsModule = Modules[module].actions;
  Object.keys(actionsModule).forEach((action) => {
    actionsModules[`${action}Start`] = actionsModule[action].action.start || ['params'];
    actionsModules[`${action}Error`] = actionsModule[action].action.error;
    actionsModules[`${action}Success`] = actionsModule[action].action.success;
  });
  actions[module] = createActions(actionsModules, {
    prefix: `${module.toUpperCase()}/`,
  });
});

export default actions;
