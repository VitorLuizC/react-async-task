import { useLayoutEffect, useRef } from 'react';
import useLazyAsyncTask from '../useAsyncTaskLazy';
import type AsyncTask from '../AsyncTask';

export type AsyncTaskResult<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
}>;

function useAsyncTask<Result>(
  task: AsyncTask<Result>,
): AsyncTaskResult<Result> {
  const firstRenderRef = useRef(true);

  const { error, result, pending, executeAsyncTask } =
    useLazyAsyncTask<Result>();

  useLayoutEffect(() => {
    firstRenderRef.current = false;
    executeAsyncTask(task);
  }, [task, executeAsyncTask]);

  return {
    error,
    result,
    pending: firstRenderRef.current || pending,
  };
}

export default useAsyncTask;
