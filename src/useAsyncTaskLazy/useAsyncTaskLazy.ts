import { useCallback } from 'react';
import isAbortError from './isAbortError';
import { ActionType } from '../store';
import useAbortController from '../useAbortController';
import useAsyncTaskReducer from '../useAsyncTaskReducer';
import type AsyncTask from '../AsyncTask';

export type AsyncTaskLazyResult<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
  executeAsyncTask: (task: AsyncTask<Result>) => Promise<void>;
}>;

function useAsyncTaskLazy<Result>(): AsyncTaskLazyResult<Result> {
  const { signal } = useAbortController();

  const [state, dispatch] = useAsyncTaskReducer<Result>();

  const executeAsyncTask = useCallback(async (task: AsyncTask<Result>) => {
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

  return {
    error: state.error,
    result: state.result,
    pending: state.pendingTasks > 0,
    executeAsyncTask,
  };
}

export default useAsyncTaskLazy;
