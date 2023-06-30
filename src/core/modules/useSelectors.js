import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ReducersProvider } from '../contexts';

export default (module, prop = null) => {
  const { selectors } = useContext(ReducersProvider);

  if (prop) {
    return useSelector((state) => selectors[module].state(state)[prop]);
  }

  const valueProp = useSelector((state) => selectors[module].state(state));

  return valueProp;
};
