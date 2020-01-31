import { gql } from "apollo-boost";

export const CUSTOM_INCREMENT = "CUSTOM_INCREMENT";

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
) => { type: typeof CUSTOM_INCREMENT; payload: number };

const baseCustomIncrementActionCreator: CustomIncrementActionCreator = (
  payload: any
) => ({ type: CUSTOM_INCREMENT, payload });

export const customIncrementActionCreator = actionCreatorToApolloMutation(
  baseCustomIncrementActionCreator
);

export type CounterActionTypes = ReturnType<CustomIncrementActionCreator>;
