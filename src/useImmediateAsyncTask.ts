import { useLayoutEffect, useRef } from 'react';
import type AsyncTask from './AsyncTask';
import useLazyAsyncTask from './useLazyAsyncTask';

export type UseImmediateAsyncTaskResult<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
  executeTask: () => Promise<void>;
}>;

function useImmediateAsyncTask<Result>(
  task: AsyncTask<Result>,
): UseImmediateAsyncTaskResult<Result> {
  const firstRenderRef = useRef(true);

  const { error, result, pending, executeTask } = useLazyAsyncTask(task);

  useLayoutEffect(() => {
    executeTask();

    return () => {
      firstRenderRef.current = false;
    };
  }, [executeTask]);

  return {
    error,
    result,
    pending: firstRenderRef.current || pending,
    executeTask,
  };
}

export default useImmediateAsyncTask;
