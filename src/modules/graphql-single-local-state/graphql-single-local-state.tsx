import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { LocalStateComponent } from '../../components/LocalState';
import { selectCounterValue } from './state/counter/selectors';
import { useCounterActions } from './state/counter/use-counter-actions';

export const GET_LOCAL_STATE = gql`
  query LocalState {
    localState @client {
      counter {
        value
        nextValue
        prevValue
      }
    }
  }
`;

function useLocalState() {
  const { data: state, loading } = useQuery(GET_LOCAL_STATE);
  const { custom, incrementOdd } = useCounterActions();

  return {
    custom,
    incrementOdd,
    counterValue: !loading && selectCounterValue(state)
  };
}

export const GraphqlSingleLocalState = () => {
  const { custom, counterValue, incrementOdd } = useLocalState();

  const incrementOddHandler = () => {
    incrementOdd(1);
  };

  const increment = () => {
    custom(1);
  };

  const decrement = () => {
    custom(-1);
  };

  return (
    <LocalStateComponent
      increment={increment}
      decrement={decrement}
      counter={counterValue}
      incrementOddHandler={incrementOddHandler}
    />
  );
};
