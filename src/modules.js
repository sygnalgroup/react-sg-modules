import { sgModule } from './core/utils/helpers';

let modules;

let storeMiddlewares = [];
let connectRouter;
let authHeaders;

try {
  try {
    if (__dirname) {
      modules = require(`${__dirname}/../../../../src/modules/index.js`);
    } else {
      modules = require(`../../../../src/modules/index.js`);
    }
  } catch {
    modules = require(`../../../../src/modules/index.js`);
  }

  storeMiddlewares = modules.storeMiddlewares || (() => []);
  connectRouter = modules.connectRouter || null;
  authHeaders = modules.authHeaders || null;
} catch (ex) {
  console.error(
    'Error: Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js ',
    ex,
  );
  modules = {};
}

export { storeMiddlewares, connectRouter, authHeaders };

const appModules = modules.default || {};

Object.keys(appModules).forEach((key) => {
  appModules[key] = sgModule(key, appModules[key]);
});

export default modules.default;
