import getAbortController from './getAbortController';

describe('getAbortController | unit tests', () => {
  it('returns a new AbortController instance', () => {
    expect(getAbortController()).toBeInstanceOf(AbortController);
  });

  describe("when environment doesn't support AbortController", () => {
    const ORIGINAL_ABORT_CONTROLLER = globalThis.AbortController;

    beforeEach(() => {
      // @ts-expect-error it simulates the absence of 'AbortController'.
      delete globalThis.AbortController;
    });

    afterEach(() => {
      globalThis.AbortController = ORIGINAL_ABORT_CONTROLLER;
    });

    it('returns null', () => {
      expect(getAbortController()).toBeNull();
    });
  });
});
