import type AsyncTaskParams from './AsyncTaskParams';

type AsyncTask<Result> = (params: AsyncTaskParams) => Promise<Result>;

export default AsyncTask;
