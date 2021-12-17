import { createSelector } from 'reselect'
import AppModules from '../../modules'

const Modules = AppModules.default

const selectors = {}

Object.keys(Modules).forEach((module) => {
  const getState = (state) => {
    return state[module]
  }

  selectors[module] = { state: createSelector(getState, (state) => state) }
})

export default selectors
