/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import useAsyncTaskLazy from './useAsyncTaskLazy';

describe('useAsyncTaskLazy | integration tests', () => {
  it('keep track of the pending state', async () => {
    // eslint-disable-next-line prettier/prettier
    const { result } = renderHook(useAsyncTaskLazy<void>);

    expect(result.current.pending).toBe(false);

    act(() => {
      result.current.executeAsyncTask(() => Promise.resolve());
    });

    expect(result.current.pending).toBe(true);

    await act(() => Promise.resolve());

    expect(result.current.pending).toBe(false);
  });

  describe('when task finishes', () => {
    it('returns the result', async () => {
      // eslint-disable-next-line prettier/prettier
      const { result } = renderHook(useAsyncTaskLazy<number>);

      expect(result.current.result).toBe(null);

      act(() => {
        result.current.executeAsyncTask(() => Promise.resolve(10));
      });

      expect(result.current.result).toBe(null);

      await act(() => Promise.resolve());

      expect(result.current.result).toBe(10);
    });
  });

  describe('when task fails', () => {
    it('returns the error', async () => {
      // eslint-disable-next-line prettier/prettier
      const { result } = renderHook(useAsyncTaskLazy<number>);

      expect(result.current.result).toBe(null);

      const error = new Error('Ooops!');

      act(() => {
        result.current.executeAsyncTask(() => Promise.reject(error));
      });

      expect(result.current.error).toBe(null);

      await act(() => Promise.resolve());

      expect(result.current.error).toBe(error);
    });
  });

  describe('when component unmounts', () => {
    it('aborts the task', async () => {
      // eslint-disable-next-line prettier/prettier
      const { result, unmount } = renderHook(useAsyncTaskLazy<number>);

      const handler = jest.fn();

      act(() => {
        result.current.executeAsyncTask(({ signal }) => {
          return new Promise((resolve, reject) => {
            signal?.addEventListener('abort', () => {
              handler();
              reject(new DOMException('Aborted!', 'AbortError'));
            });

            setTimeout(() => resolve(Math.random()), 100);
          });
        });
      });

      expect(handler).not.toHaveBeenCalled();

      unmount();

      expect(handler).toHaveBeenCalled();
    });
  });
});
