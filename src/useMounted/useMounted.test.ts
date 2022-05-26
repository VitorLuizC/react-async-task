/** @jest-environment jsdom */

import { renderHook } from '@testing-library/react';
import useMounted from './useMounted';

describe('useMounted | integration tests', () => {
  it('returns a function that checks if component is mounted', () => {
    const { result, unmount } = renderHook(useMounted);

    const mounted = result.current;

    expect(mounted()).toBe(true);

    unmount();

    expect(mounted()).toBe(false);
  });
});
