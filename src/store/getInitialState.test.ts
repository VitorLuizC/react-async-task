import getInitialState from './getInitialState';

describe('getInitialState | unit tests', () => {
  it('returns the initial state object', () => {
    expect(getInitialState()).toEqual({
      error: null,
      result: null,
      pendingTasks: 0,
    });
  });
});
