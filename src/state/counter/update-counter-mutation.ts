import { gql } from "apollo-boost";

export const UPDATE_COUNTER = gql`
  mutation UpdateCounter($value: Number!) {
    updateCounter(value: $counter) @client
  }
`;

export const setCounter = (mutate: any, state?: any) => (value: any) => {
  mutate({ variables: { counter: value } });
};
