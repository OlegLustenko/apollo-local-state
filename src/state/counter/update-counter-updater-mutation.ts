import { gql } from "apollo-boost";

export const UPDATE_COUNTER_UPDATER = gql`
  mutation UpdateCounterUpdater($updater: Number!) {
    updateCounterUpdater(value: $updater) @client
  }
`;

export const updateCounterUpdater = (mutate: any, initialState?: any) => (
  value: any
) => {
  mutate({ variables: { updater: value } });
};

