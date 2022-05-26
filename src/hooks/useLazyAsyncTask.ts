import { useCallback } from 'react';
import type AsyncTask from './AsyncTask';
import useImperativeAsyncTask from './useImperativeAsyncTask';

export type LazyAsyncTask<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
  executeTask: () => Promise<void>;
}>;

function useLazyAsyncTask<Result>(
  task: AsyncTask<Result>,
): LazyAsyncTask<Result> {
  const { executeTask, ...state } = useImperativeAsyncTask<Result>();

  return {
    ...state,
    executeTask: useCallback(() => executeTask(task), [task]),
  };
}

export default useLazyAsyncTask;
