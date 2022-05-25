import { useRef, useCallback, useLayoutEffect } from 'react';

export type UseMountedResult = () => boolean;

/** React.js hook that provides a function to check if component is mounted. */
function useMounted(): UseMountedResult {
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
