import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ReducersProvider } from '../contexts';

export default () => {
  const dispatchRedux = useDispatch();
  const { actions } = useContext(ReducersProvider);

  const request = useCallback(
    ({ action, data, options }) => {
      const { module, name } = action;
      dispatchRedux(actions[module].Creators[`${name}Start`]({ data, options: options || {} }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatchRedux],
  );

  return {
    request,
    dispatch: request,
  };
};
