export declare type AsyncTaskParams = {
    signal?: AbortSignal;
};
declare type AsyncTask<Result> = (params: AsyncTaskParams) => Promise<Result>;
export default AsyncTask;
//# sourceMappingURL=AsyncTask.d.ts.map