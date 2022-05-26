interface State<Result> {
    /** The last task error, if it was failed. */
    error: Error | null;
    /** The last task result, if it was succeeded. */
    result: Result | null;
    /** The number of tasks that are currently pending. */
    pendingTasks: number;
}
export default State;
//# sourceMappingURL=State.d.ts.map