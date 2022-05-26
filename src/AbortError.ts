/** Type that represents an error thrown when aborting an async task. */
type AbortError = DOMException & {
  name: 'AbortError';
};

export default AbortError;
