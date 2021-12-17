/* eslint-disable import/no-dynamic-require */
let modules

// eslint-disable-next-line import/no-mutable-exports
let storeMiddlewares = []

try {
  modules = require(`${__dirname}/../../onboarding-react-web/src/modules/index.js`)

  storeMiddlewares = modules.storeMiddlewares || (() => [])
  // eslint-disable-next-line global-require
  // modules = require(`${__dirname}/../../../../src/modules/index.js`)
} catch (ex) {
  console.error(
    'Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js ',
    ex
  )
  modules = {}
}

console.log(' modules', storeMiddlewares)
// console.log(' mxiddlewares', AppMiddlewares)

export { storeMiddlewares }

export default modules.default
