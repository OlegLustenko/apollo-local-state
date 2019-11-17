import { gql } from "apollo-boost";

export const GET_COUNTER = gql`
  query Counter {
    counter @client
    counterUpdater @client
  }
`;

export const GET_COUNTER_VIEW_MODEL = gql`
  query Counter {
    counter @client
    counterUpdater @client
    nextCounterValue @client
  }
`;

export const selectCounter = (readQuery: any) => {
  const counterState = readQuery({ query: GET_COUNTER });

  return counterState.counter;
};

export const selectNextCounterValue = async (query: any) => {
  const {
    data: { counter, counterUpdater }
  } = await query({
    query: GET_COUNTER
  });
  const nextValue = counter + counterUpdater;

  return nextValue;
};
