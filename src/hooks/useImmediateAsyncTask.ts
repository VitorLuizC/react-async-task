import { useLayoutEffect, useRef } from 'react';
import useLazyAsyncTask from '../useAsyncTaskLazy';
import type AsyncTask from '../AsyncTask';

export type ImmediateAsyncTask<Result> = Readonly<{
  error: Error | null;
  result: Result | null;
  pending: boolean;
}>;

function useImmediateAsyncTask<Result>(
  task: AsyncTask<Result>,
): ImmediateAsyncTask<Result> {
  const firstRenderRef = useRef(true);

  const { error, result, pending, executeAsyncTask } =
    useLazyAsyncTask<Result>();

  useLayoutEffect(() => {
    executeAsyncTask(task);

    return () => {
      firstRenderRef.current = false;
    };
  }, [task, executeAsyncTask]);

  return {
    error,
    result,
    pending: firstRenderRef.current || pending,
  };
}

export default useImmediateAsyncTask;
