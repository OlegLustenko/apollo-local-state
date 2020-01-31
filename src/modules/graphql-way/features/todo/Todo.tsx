import { useQuery } from '@apollo/client';
import React from 'react';

import { TodoListItem } from './components/TodoListItem';
import { TodoList } from '../../components/Todo/components/TodoList';
import { TodoAddTodoButton } from './components/TodoAddTodoButton/TodoAddTodoButton';
import { TodoCompletedTodo } from './components/TodoComletedTodo';
import { todoQueryRegistry } from './state/todo/todo-querries-registry';
import { TodoModelState } from './state/todo/resolvers/todo-resolvers';

function useTodo() {
  const { data, loading } = useQuery<Partial<TodoModelState>>(
    todoQueryRegistry.getTodoItemsIds,
  );

  return {
    todos: data?.todos?.items ?? [], // TODO: Initial state
    loading,
  };
}

export const Todo = () => {
  const { todos } = useTodo();

  return (
    <div
      style={{
        gridGap: '10px',
        display: 'grid',
        gridTemplateRows: '5fr 2fr',
      }}
    >
      <TodoList>
        {todos.map((todo, index: number) => (
          <TodoListItem todo={todo} key={index} />
        ))}
      </TodoList>
      <TodoCompletedTodo />
      <TodoAddTodoButton />
    </div>
  );
};
