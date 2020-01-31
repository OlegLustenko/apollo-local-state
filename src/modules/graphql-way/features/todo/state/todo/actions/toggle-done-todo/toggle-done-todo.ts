import { ApolloClient } from '@apollo/client';

import { TodoMutationRegistry } from '../../use-todo-mutation-registry';
import { todoQueryRegistry } from '../../todo-querries-registry';
import { toggleTodoActionCreatorMutation } from '../todo-action-creators';

export const toggleDoneTodo = (
  actionsRegistry: TodoMutationRegistry,
  getState: ApolloClient<object>,
) => async (id: number, checked: boolean) => {

  const todo = getState.readQuery({
    query: todoQueryRegistry.getTodoItemDone,
    variables: { id },
  });

  actionsRegistry.toggleTodo(
    toggleTodoActionCreatorMutation(id, todo.todos.done),
  );
};
