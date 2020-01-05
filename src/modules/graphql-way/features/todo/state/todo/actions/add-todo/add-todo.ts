import { ApolloClient } from '@apollo/client';

import { TodoMutationRegistry } from '../../use-todo-mutation-registry';
import { addTodoActionCreatorMutation } from '../todo-action-creators';

export const addTodo = (
  actionsRegistry: TodoMutationRegistry,
  getState: ApolloClient<object>,
) => async (name: string) => {

  await actionsRegistry.addTodo(addTodoActionCreatorMutation(name));

};
