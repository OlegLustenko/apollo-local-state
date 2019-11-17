import { gql } from "apollo-boost";

export const GET_COUNTER = gql`
  query Counter {
    counter @client
  }
`;

export const selectCounter = (readQuery: any) => {
  const counterState = readQuery({ query: GET_COUNTER });

  return counterState.counter;
};
