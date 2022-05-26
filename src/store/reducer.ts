import ActionType from './ActionType';
import type { Reducer } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<any> = (state, action) => {
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
      throw new Error("An invalid action was dispatched to 'useTaskReducer'.");
  }
};

export default reducer;
