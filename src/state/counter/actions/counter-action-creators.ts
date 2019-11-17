import { gql } from "apollo-boost";

export const CUSTOM = "CUSTOM";

const actionCreatorToApolloMutation = (actionCreator: any) => (
  ...args: any
) => {
  return { variables: actionCreator(...args) };
};

export const UPDATE_LOCAL_STATE_COUNTER = gql`
  mutation UpdateLocalState($type: String!, $payload: Number) {
    updateLocalState(type: $type, payload: $payload) @client
  }
`;

type CustomIncrementActionCreator = (
  payload: number
) => { type: typeof CUSTOM; payload: number };

const baseCustomIncrementActionCreator: CustomIncrementActionCreator = (
  payload: any
) => ({ type: CUSTOM, payload });

export const customIncrementActionCreator = actionCreatorToApolloMutation(
  baseCustomIncrementActionCreator
);

export type CounterActionTypes = ReturnType<CustomIncrementActionCreator>;
