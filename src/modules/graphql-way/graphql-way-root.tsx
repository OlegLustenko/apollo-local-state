import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from './features/todo/state/client';
import { Todo } from './features/todo/Todo';

export const GraphqlWayRoot = () => {
  console.log(client.extract());
  return (
    <>
      <ApolloProvider client={client}>
        <Todo />
      </ApolloProvider>
    </>
  );
};
