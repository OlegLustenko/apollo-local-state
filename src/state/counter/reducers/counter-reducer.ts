import produce from "immer";

import { CounterActionTypes, CUSTOM_INCREMENT } from "../actions";

export const counterReducer = produce(
  (state: any, action: CounterActionTypes) => {
    switch (action.type) {
      case CUSTOM_INCREMENT: {
        state.localState.counter.value += action.payload;
        return;
      }
      default: {
        return state;
      }
    }
  }
);
