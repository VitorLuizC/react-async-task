import type State from './State';
import type Action from './Action';

type Reducer<Result> = (
  state: State<Result>,
  action: Action<Result>,
) => State<Result>;

export default Reducer;
