import React from 'react';

import { TodoListItemCheckbox } from './components';
import { TodoListItemComponent } from '../../../../components/Todo/components/TodoList/components/TodoListItem';
import { useQuery } from '@apollo/client';
import {
  GetTodoName,
  GetTodoNameVariables,
  todoQueryRegistry,
} from '../../state/todo/todo-querries-registry';
import { TodoItemModel } from '../../state/todo/models/TodoItemModel';

function useTodoListItem(id: number) {
  const { data } = useQuery<GetTodoName, GetTodoNameVariables>(
    todoQueryRegistry.getTodoName,
    {
      variables: { id },
    },
  );

  return {
    todoName: data?.todos?.todoName,
  };
}

export const TodoListItem = ({ todo }: { todo: TodoItemModel }) => {
  const { todoName } = useTodoListItem(todo.id);

  return (
    <TodoListItemComponent>
      <span>
        <TodoListItemCheckbox id={todo.id} />
      </span>
      {todoName}
    </TodoListItemComponent>
  );
};
