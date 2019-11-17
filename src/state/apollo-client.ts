import ApolloClient, {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-boost";

import { GET_LOCAL_STATE } from "../LocalState";
import { counterReducer } from "./counter/reducers";

const createCache = () => {
  const cache = new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher()
  });

  const initialState = {
    __typename: "LocalState",
    counter: {
      __typename: "Counter",
      prevValue: 0,
      nextValue: -1,
      value: 0
    }
  };

  cache.writeData({
    data: {
      localState: initialState,
      networkStatus: {
        __typename: "NetworkStatus",
        isConnected: false
      }
    }
  });

  return cache;
};

export const createClient = () =>
  new ApolloClient({
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
