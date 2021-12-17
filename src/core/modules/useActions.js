import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { ReducersProvider } from '../contexts'

export default () => {
  const dispatch = useDispatch()
  const { actions } = useContext(ReducersProvider)
  const request = ({ action, data, options }) => {
    const { module, name } = action
    dispatch(
      actions[module].Creators[`${name}Start`]({ data, options: options || {} })
    )
  }

  return {
    request
  }
}
