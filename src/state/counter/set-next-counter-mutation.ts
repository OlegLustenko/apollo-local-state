import { gql } from "apollo-boost";

import { selectNextCounterValue } from "../../select-counter";

export const UPDATE_NEXT_COUNTER_MUTATION = gql`
  mutation UpdateNextCounterMutation {
    updateNextCounterMutation @client
  }
`;

export const updateNextCounter = (mutate: any) => (value: any) => {
  mutate();
};

const setNextCounterValueCreator = (value: number) => ({
  data: {
    nextCounterValue: value
  }
});

export const setNextCounterValue = (
  writeData: any,
  query?: any
) => async () => {
  const nextValue = await selectNextCounterValue(query);

  writeData(setNextCounterValueCreator(nextValue));
};

export const createMutation = (action: any) => (
  _result: any,
  variables: any,
  { client }: { client: any }
) => {
  const query = client.query.bind(client);
  const writeData = client.writeData.bind(client);

  action(writeData, query)(variables);
};

export const updateNextCounterValueAction = createMutation(setNextCounterValue);
