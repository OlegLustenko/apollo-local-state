import { selectCounterValue } from '../../selectors';
import { customIncrementActionCreator } from '../counter-action-creators';

export const incrementCounterValueIfOdd = (dispatch: any, state: any) => (
  value: number
) => {
  const counter = selectCounterValue(state);

  if (counter % 2 === 0) {
    return;
  }

  dispatch(customIncrementActionCreator(value));
  dispatch(customIncrementActionCreator(50));

  setTimeout(() => {
    dispatch(customIncrementActionCreator(100));
  }, 3000);
};
