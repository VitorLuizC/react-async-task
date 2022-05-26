import { useCallback, useLayoutEffect, useState } from 'react';
import getAbortController from './getAbortController';
import useMounted from '../hooks/useMounted';

export type UseAbortControllerResult = {
  abort: () => void;
  signal: AbortSignal | null;
};

/**
 * React.js hook that provides the `AbortController` signal object and the
 * abort function.
 */
function useAbortController(): UseAbortControllerResult {
  const mounted = useMounted();

  const [controller, setController] = useState(getAbortController);

  useLayoutEffect(() => () => controller?.abort(), [controller]);

  const abort = useCallback(() => {
    if (!mounted()) return;

    setController(getAbortController);
  }, [mounted]);

  return {
    abort,
    signal: controller?.signal ?? null,
  };
}

export default useAbortController;
