import type AsyncTask from '../AsyncTask';
export declare type AsyncTaskResult<Result> = Readonly<{
    error: Error | null;
    result: Result | null;
    pending: boolean;
}>;
declare function useAsyncTask<Result>(task: AsyncTask<Result>): AsyncTaskResult<Result>;
export default useAsyncTask;
//# sourceMappingURL=useAsyncTask.d.ts.map