import { useCallback } from 'react';
import type AsyncTask from './AsyncTask';
import isAbortError from './isAbortError';
import { ActionType } from '../store';
import useAbortController from '../useAbortController';
import useAsyncTaskReducer from '../useAsyncTaskReducer';

export type ImperativeAsyncTask<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
  executeTask: (task: AsyncTask<Result>) => Promise<void>;
}>;

function useImperativeAsyncTask<Result>(): ImperativeAsyncTask<Result> {
  const { signal } = useAbortController();

  const [state, dispatch] = useAsyncTaskReducer<Result>();

  const executeTask = useCallback(async (task: AsyncTask<Result>) => {
    dispatch({ type: ActionType.STARTED });

    try {
      dispatch({
        type: ActionType.SUCCEEDED,
        result: await task({
          signal: signal ?? undefined,
        }),
      });
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      dispatch({ type: ActionType.FAILED, error: error as Error });
    } finally {
      dispatch({ type: ActionType.FINISHED });
    }
  }, []);

  const { error, result, pendingTasks } = state;

  return {
    error,
    result,
    pending: pendingTasks > 0,
    executeTask,
  };
}

export default useImperativeAsyncTask;
