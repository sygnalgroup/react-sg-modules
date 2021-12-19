/* eslint-disable import/no-mutable-exports */

import { sgModule } from './core/utils/helpers';

/* eslint-disable import/no-dynamic-require */
let modules;

let storeMiddlewares = [];
let connectRouter;

try {
  // modules = require(`${__dirname}/../../onboarding-react-web/src/modules/index.js`)
  // eslint-disable-next-line global-require
  modules = require(`${__dirname}/../../../../src/modules/index.js`);

  storeMiddlewares = modules.storeMiddlewares || (() => []);
  connectRouter = modules.connectRouter || null;
} catch (ex) {
  console.error(
    'Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js ',
    ex,
  );
  modules = {};
}

export { storeMiddlewares, connectRouter };

const appModules = modules.default;

Object.keys(appModules).forEach((key) => {
  appModules[key] = sgModule(key, appModules[key]);
});

export default modules.default;
