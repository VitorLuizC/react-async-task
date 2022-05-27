export declare type UseAbortControllerResult = {
    abort: () => void;
    signal: AbortSignal | null;
};
/**
 * React.js hook that provides the `AbortController` signal object and the
 * abort function.
 */
declare function useAbortController(): UseAbortControllerResult;
export default useAbortController;
//# sourceMappingURL=useAbortController.d.ts.map