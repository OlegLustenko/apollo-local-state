import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LocalStateComponent } from "./components/LocalState";
import { selectCounterValue } from "./state/counter/selectors";
import { useCounterActions } from "./state/counter/use-counter-actions";

export const GET_LOCAL_STATE = gql`
  query LocalState {
    localState {
      counter @client {
        value
        nextValue
        prevValue
      }
    }
  }
`;

function useLocalState() {
  const { data: state } = useQuery(GET_LOCAL_STATE);
  const { custom, incrementOdd } = useCounterActions();

  return {
    custom,
    incrementOdd,
    counterValue: selectCounterValue(state)
  };
}

export const LocalState = () => {
  const { custom, counterValue, incrementOdd } = useLocalState();

  const incrementOddHandler = () => {
    incrementOdd(1);
  };

  const increment = () => {
    custom(1);
  };

  return (
    <LocalStateComponent
      increment={increment}
      decrement={incrementOddHandler}
      counter={counterValue}
    />
  );
};
