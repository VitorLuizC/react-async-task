import { useCallback, useLayoutEffect, useRef } from 'react';

/** React.js hook that provides a function to check if component is mounted. */
function useMounted(): () => boolean {
  const mountedRef = useRef(true);

  useLayoutEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  return useCallback(() => mountedRef.current, []);
}

export default useMounted;
