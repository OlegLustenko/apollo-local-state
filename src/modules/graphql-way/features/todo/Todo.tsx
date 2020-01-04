import { gql, useQuery } from '@apollo/client';
import React from 'react';

import { TodoListItem } from './components/TodoListItem';
import { TodoList } from '../../components/Todo/components/TodoList';
import { TodoAddTodoButton } from './components/TodoAddTodoButton/TodoAddTodoButton';
import { TodoItem } from '../../../../core/entities/Todo';
import { TodoCompletedTodo } from './components/TodoComletedTodo';

function useTodo() {
  const { data, loading } = useQuery(
    gql`
      query GetTodos {
        todos @client(always: true) {
          items {
            id
          }
        }
      }
    `,
  );

  return {
    todos: data?.todos?.items ?? [],
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
        {todos.map((todo: TodoItem, index: number) => (
          <TodoListItem todo={todo} key={index} />
        ))}
      </TodoList>
      <TodoCompletedTodo />
      <TodoAddTodoButton />
    </div>
  );
};
