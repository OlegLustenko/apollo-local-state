import { InMemoryCache, ApolloClient } from '@apollo/client';

import { FieldPolicy } from '@apollo/client/cache/inmemory/policies';

import { selectCompleted } from '../graphql-way/features/todo/state/todo/selectors/select-completed';
import { selectCompletedName } from '../graphql-way/features/todo/state/todo/selectors/select-completed-name';
import { selectTodoDone } from '../graphql-way/features/todo/state/todo/selectors/select-todo-done';
import { selectTodoName } from '../graphql-way/features/todo/state/todo/selectors/select-todo-name';
import { selectTodoById } from '../graphql-way/features/todo/state/todo/selectors/select-todo-by-id';
import { todoTypeDefs } from '../graphql-way/features/todo/state/todo/todo-type-defs';
import { initializeTodoRootResolvers } from '../graphql-way/features/todo/state/todo/resolvers/todo-resolvers';

export type ReadField = NonNullable<FieldPolicy<any>['read']>;

const cache = new InMemoryCache({
  typePolicies: {
    Todos: {
      fields: {
        completed: selectCompleted,
        completedName: selectCompletedName,
        getTodoById: selectTodoById,
        todoName: selectTodoName,
        todoDone: selectTodoDone,
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  resolvers: {},
  typeDefs: todoTypeDefs,
});

export type ApolloClientInitialized = typeof apolloClient;

initializeTodoRootResolvers(apolloClient);
