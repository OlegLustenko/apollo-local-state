import { gql } from '@apollo/client';

export const todoTypeDefs = gql`
  extend type Query {
    todos: Todos!
  }

  type Todos {
    items: [TodoItem]!
    completed: [TodoItem]
  }

  type TodoItem {
    id: String!
    done: Boolean!
    name: String!
  }

  type Mutation {
    addTodo(name: String!): TodoItem
    toggleTodo(id: String!, checked: Boolean!): TodoItem
  }
`;
