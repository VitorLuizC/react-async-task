/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import { ActionType, reducer } from '../store';
import useAsyncTaskReducer from './useAsyncTaskReducer';

jest.mock('../store', () => {
  const store = jest.requireActual('../store');

  return {
    ...store,
    reducer: jest.fn(store.reducer),
  };
});

describe('useAsyncTaskReducer | integration tests', () => {
  beforeEach(() => {
    (reducer as jest.Mock).mockClear();
  });

  it('returns the state and dispatch function', () => {
    const { result } = renderHook(useAsyncTaskReducer);

    expect(result.current[0]).toEqual({
      error: null,
      result: null,
      pendingTasks: 0,
    });

    act(() => {
      result.current[1]({
        type: ActionType.STARTED,
      });
    });

    expect(result.current[0]).toEqual({
      error: null,
      result: null,
      pendingTasks: 1,
    });
  });

  describe('when component unmounts', () => {
    it("prevents memory leaks and doesn't dispatch actions", () => {
      const { result, unmount } = renderHook(useAsyncTaskReducer);

      expect(result.current[0]).toEqual({
        error: null,
        result: null,
        pendingTasks: 0,
      });

      unmount();

      act(() => {
        result.current[1]({
          type: ActionType.STARTED,
        });
      });

      expect(reducer).not.toHaveBeenCalled();
    });
  });
});
