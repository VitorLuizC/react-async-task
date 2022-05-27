/*!
 * react-async-task v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

import { __assign, __awaiter, __generator } from 'tslib';
import { useCallback, useRef, useLayoutEffect, useState, useReducer, useMemo } from 'react';

function isAbortError(error) {
    // The environment doesn't support 'DOMException'.
    if (typeof DOMException === 'undefined')
        return false;
    if (error instanceof DOMException) {
        return error.name === 'AbortError';
    }
    return false;
}

var ActionType;
(function (ActionType) {
    ActionType["FAILED"] = "FAILED";
    ActionType["STARTED"] = "STARTED";
    ActionType["FINISHED"] = "FINISHED";
    ActionType["SUCCEEDED"] = "SUCCEEDED";
})(ActionType || (ActionType = {}));
var ActionType$1 = ActionType;

function reducer(state, action) {
    switch (action.type) {
        case ActionType$1.STARTED:
            return __assign(__assign({}, state), { pendingTasks: state.pendingTasks + 1 });
        case ActionType$1.FINISHED:
            return __assign(__assign({}, state), { pendingTasks: state.pendingTasks - 1 });
        case ActionType$1.FAILED:
            return __assign(__assign({}, state), { error: action.error, result: null });
        case ActionType$1.SUCCEEDED:
            return __assign(__assign({}, state), { error: null, result: action.result });
        default:
            throw new Error('Invalid action type.');
    }
}

/** Get the initial state for the store. */
function getInitialState() {
    return {
        error: null,
        result: null,
        pendingTasks: 0,
    };
}

/**
 * Get a new `AbortController` instance if the environment supports it.
 * Otherwise, it returns `null`.
 */
function getAbortController() {
    if (typeof AbortController === 'undefined') {
        return null;
    }
    return new AbortController();
}

/** React.js hook that provides a function to check if component is mounted. */
function useMounted() {
    var mountedRef = useRef(true);
    useLayoutEffect(function () { return function () {
        mountedRef.current = false;
    }; }, []);
    return useCallback(function () { return mountedRef.current; }, []);
}

/**
 * React.js hook that provides the `AbortController` signal object and the
 * abort function.
 */
function useAbortController() {
    var _a;
    var mounted = useMounted();
    var _b = useState(getAbortController), controller = _b[0], setController = _b[1];
    useLayoutEffect(function () { return function () { return controller === null || controller === void 0 ? void 0 : controller.abort(); }; }, [controller]);
    var abort = useCallback(function () {
        if (!mounted())
            return;
        setController(getAbortController);
    }, [mounted]);
    return {
        abort: abort,
        signal: (_a = controller === null || controller === void 0 ? void 0 : controller.signal) !== null && _a !== void 0 ? _a : null,
    };
}

function useAsyncTaskReducer() {
    var mounted = useMounted();
    var _a = useReducer(
    // Prettier doesn't yet support instantiation expressions.
    // eslint-disable-next-line prettier/prettier
    (reducer), useMemo((getInitialState), [])), state = _a[0], dispatch = _a[1];
    var dispatchOnlyIfMounted = useCallback(function (action) {
        if (mounted()) {
            dispatch(action);
        }
    }, []);
    return [state, dispatchOnlyIfMounted];
}

function useAsyncTaskLazy() {
    var _this = this;
    var signal = useAbortController().signal;
    var _a = useAsyncTaskReducer(), state = _a[0], dispatch = _a[1];
    var executeAsyncTask = useCallback(function (task) { return __awaiter(_this, void 0, void 0, function () {
        var _a, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    dispatch({ type: ActionType$1.STARTED });
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    _a = dispatch;
                    _b = {
                        type: ActionType$1.SUCCEEDED
                    };
                    return [4 /*yield*/, task({
                            signal: signal !== null && signal !== void 0 ? signal : undefined,
                        })];
                case 2:
                    _a.apply(void 0, [(_b.result = _c.sent(),
                            _b)]);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _c.sent();
                    if (isAbortError(error_1)) {
                        return [2 /*return*/];
                    }
                    dispatch({ type: ActionType$1.FAILED, error: error_1 });
                    return [3 /*break*/, 5];
                case 4:
                    dispatch({ type: ActionType$1.FINISHED });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    return {
        error: state.error,
        result: state.result,
        pending: state.pendingTasks > 0,
        executeAsyncTask: executeAsyncTask,
    };
}

function useAsyncTask(task) {
    var firstRenderRef = useRef(true);
    var _a = useAsyncTaskLazy(), error = _a.error, result = _a.result, pending = _a.pending, executeAsyncTask = _a.executeAsyncTask;
    useLayoutEffect(function () {
        firstRenderRef.current = false;
        executeAsyncTask(task);
    }, [task, executeAsyncTask]);
    return {
        error: error,
        result: result,
        pending: firstRenderRef.current || pending,
    };
}

export { useAsyncTask, useAsyncTaskLazy };
//# sourceMappingURL=index.mjs.map
