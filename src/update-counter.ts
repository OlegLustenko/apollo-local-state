import { gql } from "apollo-boost";

export const UPDATE_COUNTER = gql`
  mutation UpdateCounter($value: Number!) {
    updateCounter(value: $counter) @client {
      counter
    }
  }
`;

export const setCounter = (mutate, state?) => (value: any) => {
  mutate({ variables: { counter: value } });
};
