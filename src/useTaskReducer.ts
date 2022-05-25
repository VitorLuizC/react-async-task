import { Dispatch, useCallback, useMemo, useReducer } from 'react';
import useMounted from './useMounted';

type State<Result> = {
  error: Error | null;
  result: Result | null;
  pending: boolean;
  pendingTasks: number;
};

function getInitialState<Result>(): State<Result> {
  return {
    error: null,
    result: null,
    pending: false,
    pendingTasks: 0,
  };
}

type Action<Result> =
  | { type: 'started' }
  | { type: 'finished' }
  | { type: 'failed'; error: Error }
  | { type: 'completed'; result: Result };

function reducer<Result>(
  state: State<Result>,
  action: Action<Result>,
): State<Result> {
  switch (action.type) {
    case 'started':
      return {
        ...state,
        pending: true,
        pendingTasks: state.pendingTasks + 1,
      };
    case 'finished': {
      const pendingTasks = state.pendingTasks - 1;
      return {
        ...state,
        pending: !pendingTasks,
        pendingTasks,
      };
    }
    case 'failed':
      return {
        ...state,
        error: action.error,
        result: null,
      };
    case 'completed':
      return {
        ...state,
        error: null,
        result: action.result,
      };
    default:
      throw new Error("An invalid action was dispatched to 'useTaskReducer'.");
  }
}

export type UseTaskReducerResult<Result> = readonly [
  state: State<Result>,
  dispatch: Dispatch<Action<Result>>,
];

function useTaskReducer<Result>(): UseTaskReducerResult<Result> {
  const mounted = useMounted();

  // eslint-disable-next-line prettier/prettier
  const initialState = useMemo(getInitialState<Result>, []);

  const [state, dispatch] = useReducer(reducer<Result>, initialState);

  const dispatchWhenMounted = useCallback((action: Action<Result>) => {
    if (mounted()) {
      dispatch(action);
    }
  }, [mounted, dispatch]);

  return [state, dispatchWhenMounted];
}

export default useTaskReducer;
