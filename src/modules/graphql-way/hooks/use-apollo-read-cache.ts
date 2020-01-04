import { useApolloClient } from '@apollo/client';

export type ApolloReadCache = ReturnType<typeof useApolloReadCache>;

export function useApolloReadCache() {
  const apolloClient = useApolloClient();

  const getState = {
    readQuery: apolloClient.readQuery.bind(apolloClient),
    readFragment: apolloClient.readFragment.bind(apolloClient)
  };

  return getState;
}
