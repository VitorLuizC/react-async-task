import type State from './State';

/** Get the initial state for the store. */
function getInitialState<T>(): State<T> {
  return {
    error: null,
    result: null,
    pendingTasks: 0,
  };
}

export default getInitialState;
