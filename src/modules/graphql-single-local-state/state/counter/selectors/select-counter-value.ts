import { selectCounter } from "./select-counter";

export const selectCounterValue = (state: any) => {
  const counter = selectCounter(state);

  return counter.value;
};
