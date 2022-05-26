import ActionType from './ActionType';
import getInitialState from './getInitialState';
import reducer from './reducer';

describe('reducer | unit tests', () => {
  let state = getInitialState();

  afterEach(() => {
    state = getInitialState();
  });

  describe('when dispatches STARTED action', () => {
    it('increments the pending tasks', () => {
      expect(
        reducer(state, {
          type: ActionType.STARTED,
        }),
      ).toEqual(
        expect.objectContaining({
          pendingTasks: 1,
        }),
      );
    });
  });

  describe('when dispatches FAILED action', () => {
    it('saves the error and cleanups the result state', () => {
      const error = new Error('Oops!');

      state.result = {
        sum: 1000,
      };

      expect(
        reducer(state, {
          error,
          type: ActionType.FAILED,
        }),
      ).toEqual(
        expect.objectContaining({
          error,
          result: null,
        }),
      );
    });
  });

  describe('when dispatches SUCCEEDED action', () => {
    it('saves the result and cleanups the error state', () => {
      const result = {
        sum: 1000,
      };

      state.error = new Error('Oops!');

      expect(
        reducer(state, {
          result,
          type: ActionType.SUCCEEDED,
        }),
      ).toEqual(
        expect.objectContaining({
          result,
          error: null,
        }),
      );
    });
  });

  describe('when dispatches FINISHED action', () => {
    it('decrements pending tasks', () => {
      state.pendingTasks = 1;

      expect(
        reducer(state, {
          type: ActionType.FINISHED,
        }),
      ).toEqual(
        expect.objectContaining({
          pendingTasks: 0,
        }),
      );
    });
  });
});
