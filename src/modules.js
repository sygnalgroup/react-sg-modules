/* eslint-disable import/no-dynamic-require */
let modules
try {
  // modules = require(`${__dirname}/../../onboarding-react-web/src/modules/index.js`)
  // eslint-disable-next-line global-require
  modules = require(`${__dirname}/../../../../src/modules/index.js`)
} catch {
  console.error(
    'Modules not found, please create a file with your modules in {PROJECT_ROOT}/src/modules/index.js '
  )
  modules = {}
}

export default { ...modules }
