/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import useAbortController from './useAbortController';

describe('useAbortController | integration tests', () => {
  describe('when abort', () => {
    it('aborts the current AbortController', () => {
      const { result } = renderHook(useAbortController);

      const { abort, signal } = result.current;

      expect(signal?.aborted).toBe(false);

      act(abort);

      expect(signal?.aborted).toBe(true);
    });

    it('returns new AbortSignal', () => {
      const { result } = renderHook(useAbortController);

      const { abort, signal } = result.current;

      act(abort);

      const { signal: newSignal } = result.current;

      expect(newSignal).not.toBe(signal);
    });
  });
});
