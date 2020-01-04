import React from 'react';

type TodoListItemProps = {
  children: React.ReactNode;
};
export const TodoListItemComponent = ({ children }: TodoListItemProps) => {
  return <li>{children}</li>;
};
