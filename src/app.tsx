import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_COUNTER_VIEW_MODEL, GET_COUNTER } from "./select-counter";
import { useAppActions } from "./use-app-acitons";

import { useEffectForApolloCalculatedFields } from "./state/apollo/use-effect-for-apollo-calculated-fields";

function useApp() {
  const counterData = useQuery(GET_COUNTER_VIEW_MODEL);
  const {
    addToCounter,
    setCounter,
    setUpdater,
    setNextCounterValue
  } = useAppActions();

  useEffectForApolloCalculatedFields(GET_COUNTER, setNextCounterValue);

  return {
    counterState: counterData,
    addToCounter,
    setCounter,
    setUpdater
  };
}

export function App() {
  const {
    counterState: { loading, data, error },
    addToCounter,
    setUpdater
  } = useApp();
  const [value, setValue] = useState(0);

  if (loading) {
    return null;
  }

  const { counter, nextCounterValue, counterUpdater } = data;

  const increment = () => {
    addToCounter(counter + 1);
  };

  const decrement = () => {
    addToCounter(counter - 1);
  };

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "10px"
      }}
    >
      <button onClick={increment}>INCREMENT</button>
      <div>
        Counter: {counter} <b>next: {nextCounterValue}</b>
      </div>
      <button onClick={decrement}>DECREMENT</button>
      <input
        placeholder="increment on"
        value={value}
        onChange={event => {
          setValue(+event.target.value);
        }}
      />
      <button
        onClick={() => {
          setUpdater(value);
          setValue(0);
        }}
      >
        Submit Increment
      </button>
      <div>Counter updater: {counterUpdater}</div>
    </div>
  );
}
