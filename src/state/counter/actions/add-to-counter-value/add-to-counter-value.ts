import { customIncrementActionCreator } from "../counter-action-creators";

export const addToCounterValue = (dispatch: any, state: any) => (
  value: number
) => {
  dispatch(customIncrementActionCreator(value));
};
