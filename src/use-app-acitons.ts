import {
  UPDATE_COUNTER,
  setCounter
} from "./state/counter/update-counter-mutation";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import {
  UPDATE_COUNTER_UPDATER,
  updateCounterUpdater
} from "./state/counter/update-counter-updater-mutation";
import {
  updateNextCounter,
  UPDATE_NEXT_COUNTER_MUTATION
} from "./state/counter/set-next-counter-mutation";

export function useAppActions() {
  const [updateCounter, { data }] = useMutation(UPDATE_COUNTER);
  const [mutationCounter] = useMutation(UPDATE_COUNTER_UPDATER);
  const [updateNextCounterValue] = useMutation(UPDATE_NEXT_COUNTER_MUTATION);

  return {
    addToCounter: setCounter(updateCounter, data),
    setCounter: setCounter(updateCounter, data),
    setUpdater: updateCounterUpdater(mutationCounter),
    setNextCounterValue: updateNextCounter(updateNextCounterValue)
  };
}
