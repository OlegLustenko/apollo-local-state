import { InMemoryCache, ApolloClient, gql } from '@apollo/client';

import { counterReducer } from './counter/reducers';

const createCache = () => {
  const cache = new InMemoryCache();

  return cache;
};

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

export const client = new ApolloClient({
  cache: createCache(),
  resolvers: {
    Mutation: {
      updateLocalState: (_info, _value, storage) => {
        const localState = storage.cache.readQuery({
          query: GET_LOCAL_STATE
        });

        const newState = counterReducer(localState, _value);

        storage.cache.writeQuery({ query: GET_LOCAL_STATE, data: newState });
      }
    }
  }
});

const initialState = {
  __typename: 'LocalState',
  counter: {
    __typename: 'Counter',
    prevValue: 0,
    nextValue: -1,
    value: 0
  }
};

client.writeData({
  data: {
    localState: initialState
  }
});
