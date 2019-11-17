import produce from "immer";
import { CounterActionTypes } from "../actions";

export const counterReducer = produce(
  (state: any, action: CounterActionTypes) => {
    switch (action.type) {
      case "CUSTOM": {
        state.localState.counter.value += action.payload;
        return;
      }
      default: {
        return state;
      }
    }
  }
);
