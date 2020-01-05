import { useMutation } from '@apollo/client';

import { ADD_TODO, TOGGLE_TODO } from './actions/todo-action-creators';

export type TodoMutationRegistry = ReturnType<typeof useTodoMutationRegistry>;

export function useTodoMutationRegistry() {
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  return {
    addTodo,
    toggleTodo,
  };
}
