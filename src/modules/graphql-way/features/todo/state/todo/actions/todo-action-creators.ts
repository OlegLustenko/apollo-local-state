import { gql } from '@apollo/client';

const actionCreatorToApolloMutation = (actionCreator: any) => (
  ...args: any
) => {
  return { variables: actionCreator(...args) };
};

export const ADD_TODO = gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) @client {
      id
      name
      done
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!, $checked: Boolean!) {
    toggleTodo(id: $id, checked: $checked) @client
  }
`;

const addTodoActionCreator = (name: string) => ({
  name,
});

const toggleTodoActionCreator = (id: string, checked: boolean) => ({
  id,
  checked,
});

export const addTodoActionCreatorMutation = actionCreatorToApolloMutation(
  addTodoActionCreator,
);
export const toggleTodoActionCreatorMutation = actionCreatorToApolloMutation(
  toggleTodoActionCreator,
);
