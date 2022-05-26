import { Dispatch, useCallback, useMemo, useReducer } from 'react';
import { Action, getInitialState, Reducer, reducer, State } from './store';
import useMounted from './useMounted';

export type UseTaskReducerResult<Result> = readonly [
  state: State<Result>,
  dispatch: Dispatch<Action<Result>>,
];

function useTaskReducer<Result>(): UseTaskReducerResult<Result> {
  const mounted = useMounted();

  const initialState = useMemo<State<Result>>(getInitialState, []);

  const [state, dispatch] = useReducer<Reducer<Result>>(reducer, initialState);

  const dispatchWhenMounted = useCallback(
    (action: Action<Result>) => {
      if (mounted()) {
        dispatch(action);
      }
    },
    [mounted, dispatch],
  );

  return [state, dispatchWhenMounted];
}

export default useTaskReducer;
