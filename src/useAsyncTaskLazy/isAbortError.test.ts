/** @jest-environment jsdom */

import isAbortError from './isAbortError';

describe('isAbortError | unit tests', () => {
  describe("when environment doesn't support DOMException", () => {
    const ORIGINAL_DOM_EXCEPTION = window.DOMException;

    beforeEach(() => {
      // @ts-expect-error it simulates the absence of 'DOMException'.
      delete window.DOMException;
    });

    afterEach(() => {
      window.DOMException = ORIGINAL_DOM_EXCEPTION;
    });

    it("doesn't throw an error", () => {
      expect(isAbortError(new Error('Oops!'))).toBe(false);
    });
  });

  it('checks if the error is an AbortError', () => {
    expect(isAbortError(new DOMException('Oops!', 'AbortError'))).toBe(true);
    expect(isAbortError(new DOMException('Oops!', 'OtherError'))).toBe(false);
    expect(isAbortError(new Error('AbortError'))).toBe(false);
    expect(isAbortError('AbortError')).toBe(false);
  });
});
