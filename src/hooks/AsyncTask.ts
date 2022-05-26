export type AsyncTaskParams = {
  signal?: AbortSignal;
};

type AsyncTask<Result> = (params: AsyncTaskParams) => Promise<Result>;

export default AsyncTask;
