import React from 'react';
import { useTodoActions } from '../../state/todo/todo-actions';

function useTodoAddTodoButton() {
  const { addTodo } = useTodoActions();

  return {
    addTodo,
  };
}

export const TodoAddTodoButton = () => {
  const { addTodo } = useTodoAddTodoButton();

  const addTodoHandler = () => {
    addTodo('RANDOM TODO');
  };

  return <button onClick={addTodoHandler}>ADD RANDOM TODO</button>;
};
