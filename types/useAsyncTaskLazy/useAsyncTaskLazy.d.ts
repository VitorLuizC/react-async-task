import type AsyncTask from '../AsyncTask';
export declare type AsyncTaskLazyResult<Result> = Readonly<{
    error: Error | null;
    result: Result | null;
    pending: boolean;
    executeAsyncTask: (task: AsyncTask<Result>) => Promise<void>;
}>;
declare function useAsyncTaskLazy<Result>(): AsyncTaskLazyResult<Result>;
export default useAsyncTaskLazy;
//# sourceMappingURL=useAsyncTaskLazy.d.ts.map