/*!
 * react-async-task v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

var ReactAsyncTask = (function (exports, react) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var reducer = function (state, action) {
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
                throw new Error("An invalid action was dispatched to 'useTaskReducer'.");
        }
    };

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
        var mountedRef = react.useRef(true);
        react.useLayoutEffect(function () { return function () {
            mountedRef.current = false;
        }; }, []);
        return react.useCallback(function () { return mountedRef.current; }, []);
    }

    /**
     * React.js hook that provides the `AbortController` signal object and the
     * abort function.
     */
    function useAbortController() {
        var _a;
        var mounted = useMounted();
        var _b = react.useState(getAbortController), controller = _b[0], setController = _b[1];
        react.useLayoutEffect(function () { return function () { return controller === null || controller === void 0 ? void 0 : controller.abort(); }; }, [controller]);
        var abort = react.useCallback(function () {
            if (!mounted())
                return;
            setController(getAbortController);
        }, [mounted]);
        return {
            abort: abort,
            signal: (_a = controller === null || controller === void 0 ? void 0 : controller.signal) !== null && _a !== void 0 ? _a : null,
        };
    }

    function useImperativeAsyncTask() {
        var _this = this;
        var signal = useAbortController().signal;
        var initialState = react.useMemo(getInitialState, []);
        var _a = react.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
        var executeTask = react.useCallback(function (task) { return __awaiter(_this, void 0, void 0, function () {
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
        var error = state.error, result = state.result, pendingTasks = state.pendingTasks;
        return {
            error: error,
            result: result,
            pending: pendingTasks > 0,
            executeTask: executeTask,
        };
    }

    function useLazyAsyncTask(task) {
        var _a = useImperativeAsyncTask(), executeTask = _a.executeTask, state = __rest(_a, ["executeTask"]);
        return __assign(__assign({}, state), { executeTask: react.useCallback(function () { return executeTask(task); }, [task]) });
    }

    function useImmediateAsyncTask(task) {
        var firstRenderRef = react.useRef(true);
        var _a = useLazyAsyncTask(task), error = _a.error, result = _a.result, pending = _a.pending, executeTask = _a.executeTask;
        react.useLayoutEffect(function () {
            executeTask();
            return function () {
                firstRenderRef.current = false;
            };
        }, [executeTask]);
        return {
            error: error,
            result: result,
            pending: firstRenderRef.current || pending,
            executeTask: executeTask,
        };
    }

    exports.useImmediateAsyncTask = useImmediateAsyncTask;
    exports.useImperativeAsyncTask = useImperativeAsyncTask;
    exports.useLazyAsyncTask = useLazyAsyncTask;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React);
//# sourceMappingURL=index.iife.js.map
