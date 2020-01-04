import React from 'react';

import { TodoListItemCheckbox } from '../TodoListItemCheckbox';
import { TodoListItemComponent } from '../../../../components/Todo/components/TodoList/components/TodoListItem';
import { TodoItem } from '../../../../../../core/entities/Todo';
import { useQuery } from '@apollo/client';
import { todoQueryRegistry } from '../../state/todo/todo-querries-registry';

function useTodoListItem(id: string) {
  const { data } = useQuery(todoQueryRegistry.getTodoName, {
    variables: { id },
  });

  return {
    todoName: data?.todos?.todoName,
  };
}

export const TodoListItem = ({ todo }: { todo: TodoItem }) => {
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
