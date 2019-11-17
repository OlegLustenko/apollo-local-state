import { gql } from "apollo-boost";

const addToCounter = (value: number) => ({
  data: {
    counter: value
  }
});

const addToCounterUpdater = (value: number) => {
  return {
    data: {
      counterUpdater: value
    }
  };
};

const updateCounter = (writeData: any, query?: any) => async ({
  value
}: {
  value: any;
}) => {
  const counter = gql`
    query {
      nextCounterValue
    }
  `;
  const nextValue = await query({ query: counter });

  writeData(addToCounter(nextValue.data.nextCounterValue));
};

const setCounterUpdater = (writeData: any, query?: any) => ({
  value
}: {
  value: any;
}) => {
  writeData(addToCounterUpdater(value));
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

export const updateCounterAction = createMutation(updateCounter);
export const updateCounterUpdaterAction = createMutation(setCounterUpdater);
