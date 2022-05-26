import type AbortError from './AbortError';

function isAbortError(error: unknown): error is AbortError {
  // The environment doesn't support 'DOMException'.
  if (typeof DOMException === 'undefined') return false;

  if (error instanceof DOMException) {
    return error.name === 'AbortError';
  }

  return false;
}

export default isAbortError;
