import { useMutation, useQuery } from "@apollo/react-hooks";

import { GET_LOCAL_STATE } from "../../LocalState";
import { UPDATE_LOCAL_STATE_COUNTER } from "./actions";

import { addToCounterValue, incrementCounterValueIfOdd } from "./actions";

type CounterActions = {
  custom: ReturnType<typeof addToCounterValue>;
  incrementOdd: ReturnType<typeof incrementCounterValueIfOdd>;
};

export function useCounterActions(): CounterActions {
  const [setLocalState] = useMutation(UPDATE_LOCAL_STATE_COUNTER);
  const { data } = useQuery(GET_LOCAL_STATE);

  const custom = addToCounterValue(setLocalState, data);
  const incrementOdd = incrementCounterValueIfOdd(setLocalState, data);

  return {
    custom,
    incrementOdd
  };
}
