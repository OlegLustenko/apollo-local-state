import { selectLocalState } from "../../local-state";

export const selectCounter = (state: any) => {
  const localState = selectLocalState(state);

  return localState.counter;
};
