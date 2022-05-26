import type AsyncTask from './AsyncTask';
export declare type ImperativeAsyncTask<Result> = Readonly<{
    error: Error | null;
    result: Result | null;
    pending: boolean;
    executeTask: (task: AsyncTask<Result>) => Promise<void>;
}>;
declare function useImperativeAsyncTask<Result>(): ImperativeAsyncTask<Result>;
export default useImperativeAsyncTask;
//# sourceMappingURL=useImperativeAsyncTask.d.ts.map