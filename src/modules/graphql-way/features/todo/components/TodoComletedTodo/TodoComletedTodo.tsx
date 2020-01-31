import React from 'react';
import { useQuery } from '@apollo/client';

import { todoQueryRegistry } from '../../state/todo/todo-querries-registry';

function useTodoCompletedTodo() {
  const { data, loading } = useQuery(todoQueryRegistry.getTodoItemCompleteName);

  return {
    completed: data?.todos?.completedName,
    loading,
  };
}
export const TodoCompletedTodo = () => {
  const { completed } = useTodoCompletedTodo();
  return <div>{completed}</div>;
};
