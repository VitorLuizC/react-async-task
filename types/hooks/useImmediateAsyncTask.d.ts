import type AsyncTask from './AsyncTask';
export declare type ImmediateAsyncTask<Result> = Readonly<{
    error: Error | null;
    result: Result | null;
    pending: boolean;
    executeTask: () => Promise<void>;
}>;
declare function useImmediateAsyncTask<Result>(task: AsyncTask<Result>): ImmediateAsyncTask<Result>;
export default useImmediateAsyncTask;
//# sourceMappingURL=useImmediateAsyncTask.d.ts.map