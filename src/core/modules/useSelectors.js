import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ReducersProvider } from '../contexts'

export default (module) => {
  const { selectors } = useContext(ReducersProvider)
  const valueProp = useSelector((state) => selectors[module].state(state))
  return valueProp
}
