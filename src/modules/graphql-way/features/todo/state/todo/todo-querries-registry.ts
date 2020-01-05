import { gql } from '@apollo/client';

export type GetTodoName = {
  todos: {
    todoName: string;
  };
};

export type GetTodoNameVariables = {
  id: number;
};

export const todoQueryRegistry = {
  getTodoName: gql`
    query GetTodoName($id: String!) {
      todos @client {
        todoName(id: $id)
      }
    }
  `,
  getTodoItemDone: gql`
    query TodoItemDone($id: String!) {
      todos {
        todoDone(id: $id)
      }
    }
  `,
  getTodoItemCompleteName: gql`
    query GetTodos {
      todos @client {
        completedName
      }
    }
  `,
  getTodoItems: gql`
    query GetTodos {
      todos @client {
        items {
          id
          name
          done
        }
      }
    }
  `,
  getTodoItemsIds: gql`
    query GetTodos {
      todos @client {
        items {
          id
        }
      }
    }
  `,
};

export const todoFragmentRegistry = {
  getTodoItemDone: gql`
    fragment completedTodo on TodoItem {
      done
    }
  `,
};
