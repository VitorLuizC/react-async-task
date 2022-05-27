import { Action, State } from '../store';
export declare type AsyncTaskReducer<Result> = readonly [
    state: State<Result>,
    dispatch: (action: Action<Result>) => void
];
declare function useAsyncTaskReducer<Result>(): AsyncTaskReducer<Result>;
export default useAsyncTaskReducer;
//# sourceMappingURL=useAsyncTaskReducer.d.ts.map