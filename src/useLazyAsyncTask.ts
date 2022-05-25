import { useCallback } from 'react';
import type AsyncTask from './AsyncTask';
import isAbortError from './isAbortError';
import useAbortController from './useAbortController';
import useTaskReducer from './useTaskReducer';

export type UseLazyAsyncTaskResult<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
  executeTask: () => Promise<void>;
}>;

function useLazyAsyncTask<Result>(
  task: AsyncTask<Result>,
): UseLazyAsyncTaskResult<Result> {
  const { signal } = useAbortController();

  const [state, dispatch] = useTaskReducer<Result>();

  const { error, result, pendingTasks } = state;

  const executeTask = useCallback(async () => {
    dispatch({ type: 'started' });

    try {
      dispatch({
        type: 'completed',
        result: await task({
          signal: signal ?? undefined,
        }),
      });
    } catch (error) {
      if (isAbortError(error)) return;

      dispatch({ type: 'failed', error: error as Error });
    } finally {
      dispatch({ type: 'finished' });
    }
  }, [task]);

  return {
    error,
    result,
    pending: pendingTasks > 0,
    executeTask,
  };
}

export default useLazyAsyncTask;
