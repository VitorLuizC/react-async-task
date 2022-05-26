import type { State } from './types';

/** Get the initial state for the store. */
function getInitialState<Result>(): State<Result> {
  return {
    error: null,
    result: null,
    pendingTasks: 0,
  };
}

export default getInitialState;
