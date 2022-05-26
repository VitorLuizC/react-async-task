import ActionType from './ActionType';
import type State from './State';
import type Action from './Action';

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case ActionType.STARTED:
      return {
        ...state,
        pendingTasks: state.pendingTasks + 1,
      };
    case ActionType.FINISHED:
      return {
        ...state,
        pendingTasks: state.pendingTasks - 1,
      };
    case ActionType.FAILED:
      return {
        ...state,
        error: action.error,
        result: null,
      };
    case ActionType.SUCCEEDED:
      return {
        ...state,
        error: null,
        result: action.result,
      };
    default:
      throw new Error('Invalid action type.');
  }
}

export default reducer;
