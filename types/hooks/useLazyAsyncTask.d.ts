import type AsyncTask from './AsyncTask';
export declare type LazyAsyncTask<Result> = Readonly<{
    error: Error | null;
    result: Result | null;
    pending: boolean;
    executeTask: () => Promise<void>;
}>;
declare function useLazyAsyncTask<Result>(task: AsyncTask<Result>): LazyAsyncTask<Result>;
export default useLazyAsyncTask;
//# sourceMappingURL=useLazyAsyncTask.d.ts.map