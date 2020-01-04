import { useApolloClient, useMutation } from '@apollo/client';

import {
  ADD_TODO,
  addTodoActionCreatorMutation,
  TOGGLE_TODO,
  toggleTodoActionCreatorMutation,
} from './actions/todo-action-creators';
import { ApolloReadCache } from '../../../../hooks/use-apollo-read-cache';
import { todoQueryRegistry } from './todo-querries-registry';

const toggleTodoThunk = (
  actionsRegistry: ReturnType<typeof useTodoMutationRegister>,
  getState: ApolloReadCache,
) => async (id: string, checked: boolean) => {
  const todo = getState.readQuery({
    query: todoQueryRegistry.getTodoItemDone,
    variables: { id },
  });

  actionsRegistry.toggleTodo(
    toggleTodoActionCreatorMutation(id, todo.todos.done),
  );
};

const addTodoThunk = (
  actionsRegistry: ReturnType<typeof useTodoMutationRegister>,
  getState: ApolloReadCache,
) => async (name: string) => {
  await actionsRegistry.addTodo(addTodoActionCreatorMutation(name));
};

function useTodoMutationRegister() {
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  return {
    addTodo,
    toggleTodo,
  };
}

export function useTodoActions() {
  const mutationRegister = useTodoMutationRegister();
  const getState = useApolloClient();

  return {
    toggleTodo: toggleTodoThunk(mutationRegister, getState),
    addTodo: addTodoThunk(mutationRegister, getState),
  };
}
