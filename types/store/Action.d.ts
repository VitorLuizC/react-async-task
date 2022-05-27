import type ActionType from './ActionType';
/** Union between the store's actions. */
declare type Action<Result> = {
    type: ActionType.FAILED;
    error: Error;
} | {
    type: ActionType.STARTED;
} | {
    type: ActionType.FINISHED;
} | {
    type: ActionType.SUCCEEDED;
    result: Result;
};
export default Action;
//# sourceMappingURL=Action.d.ts.map