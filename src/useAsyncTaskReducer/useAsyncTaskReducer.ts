import { useCallback, useMemo, useReducer } from 'react';
import { Action, getInitialState, reducer, State } from '../store';
import useMounted from '../useMounted';

export type AsyncTaskReducer<Result> = readonly [
  state: State<Result>,
  dispatch: (action: Action<Result>) => void,
];

function useAsyncTaskReducer<Result>(): AsyncTaskReducer<Result> {
  const mounted = useMounted();

  const [state, dispatch] = useReducer(
    // Prettier doesn't yet support instantiation expressions.
    // eslint-disable-next-line prettier/prettier
    reducer<Result>,
    useMemo(getInitialState<Result>, []),
  );

  const dispatchOnlyIfMounted = useCallback((action: Action<Result>) => {
    if (mounted()) {
      dispatch(action);
    }
  }, []);

  return [state, dispatchOnlyIfMounted];
}

export default useAsyncTaskReducer;
