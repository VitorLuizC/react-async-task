/**
 * Get a new `AbortController` instance if the environment supports it.
 * Otherwise, it returns `null`.
 */
function getAbortController(): AbortController | null {
  if (typeof AbortController === 'undefined') {
    return null;
  }

  return new AbortController();
}

export default getAbortController;
