import React from 'react';

type TodoListProps = {
  children: React.ReactNode;
};

export const TodoList = ({ children }: TodoListProps) => {
  return <ul style={{ display: 'block' }}>{children}</ul>;
};
