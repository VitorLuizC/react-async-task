/** @jest-environment jsdom */

import { act, renderHook } from '@testing-library/react';
import useAsyncTask from './useAsyncTask';

describe('useAsyncTask | integration tests', () => {
  it('executes immediatly the task', async () => {
    const task = jest.fn(() => Promise.resolve(10));

    const { result } = renderHook(() => useAsyncTask(task));

    expect(result.current.result).toBe(null);
    expect(result.current.pending).toBe(true);

    expect(task).toHaveBeenCalledTimes(1);

    expect(result.current.result).toBe(null);
    expect(result.current.pending).toBe(true);

    await act(() => Promise.resolve());

    expect(result.current.result).toBe(10);
    expect(result.current.pending).toBe(false);
  });
});
