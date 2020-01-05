import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../store';
import { Todo } from './features/todo/Todo';

export const GraphqlWayRoot = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Todo />
    </ApolloProvider>
  );
};
