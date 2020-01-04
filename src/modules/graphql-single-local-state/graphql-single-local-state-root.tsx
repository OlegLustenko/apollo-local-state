import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { GraphqlSingleLocalState } from './graphql-single-local-state';
import { client } from './state/apollo-client';

export const GraphqlSingleLocalStateRoot = () => {
  return (
    <ApolloProvider client={client}>
      <GraphqlSingleLocalState />
    </ApolloProvider>
  );
};
