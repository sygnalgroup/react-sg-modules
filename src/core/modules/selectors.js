import { createSelector } from 'reselect'
import Modules from '../../modules'

const selectors = {}

Object.keys(Modules).forEach((module) => {
  const getState = (state) => {
    return state[module]
  }

  selectors[module] = { state: createSelector(getState, (state) => state) }
})

export default selectors
