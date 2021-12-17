import { createActions } from 'reduxsauce'
import AppModules from '../../modules'

const Modules = AppModules.default

const actionsModules = {}
const actions = {}

Object.keys(Modules).forEach((module) => {
  const actionsModule = Modules[module].actions
  Object.keys(actionsModule).forEach((action) => {
    actionsModules[`${action}Start`] = actionsModule[action].params.start
    actionsModules[`${action}Error`] = actionsModule[action].params.error
    actionsModules[`${action}Success`] = actionsModule[action].params.success
  })
  actions[module] = createActions(actionsModules, {
    prefix: `${module.toUpperCase()}/`
  })
})

export default actions
