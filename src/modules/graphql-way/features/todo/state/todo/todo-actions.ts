import { useApolloClient } from '@apollo/client';

import { useTodoMutationRegistry } from './use-todo-mutation-registry';
import { addTodo } from './actions/add-todo';
import { toggleDoneTodo } from './actions/toggle-done-todo';

export function useTodoActions() {
  const mutationRegister = useTodoMutationRegistry();
  const apolloClient = useApolloClient();

  return {
    toggleTodo: toggleDoneTodo(mutationRegister, apolloClient),
    addTodo: addTodo(mutationRegister, apolloClient),
  };
}
