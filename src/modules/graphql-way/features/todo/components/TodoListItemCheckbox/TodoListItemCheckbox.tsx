import React from 'react';
import { useQuery } from '@apollo/client';

import { TodoListCheckbox } from '../../../../components/Todo/components/TodoList/components/TodoListCheckbox';
import { useTodoActions } from '../../state/todo/todo-actions';
import { todoQueryRegistry } from '../../state/todo/todo-querries-registry';

function useTodoListItemCheckbox(id: string) {
  const { toggleTodo } = useTodoActions();
  const { data } = useQuery(todoQueryRegistry.getTodoItemDone, {
    variables: { id },
  });

  return {
    checked: data?.todos?.todoDone ?? false,
    onChange: toggleTodo,
  };
}

export const TodoListItemCheckbox = ({ id }: { id: string }) => {
  const { checked, onChange } = useTodoListItemCheckbox(id);
  const onChangeHandler = (checked: boolean) => {
    onChange(id, checked);
  };

  return <TodoListCheckbox checked={checked} onChange={onChangeHandler} />;
};
