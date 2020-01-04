import { produce } from 'immer';
import { InMemoryCache, ApolloClient, gql } from '@apollo/client';

import { FieldPolicy } from '@apollo/client/cache/inmemory/policies';
import {
  todoFragmentRegistry,
  todoQueryRegistry,
} from './todo/todo-querries-registry';
import { TodosModel } from './models/TodosModel';

type ReadField = NonNullable<FieldPolicy<any>['read']>;

const selectCompleted: ReadField = (_, ctx) => {
  const { readField } = ctx;
  const todos = readField<[]>('items');

  const completed = todos.filter((todoRef: any) => {
    const isDone = readField('done', todoRef);
    return isDone;
  });

  return completed;
};

const selectCompleteName: ReadField = (_, ctx) => {
  const { readField } = ctx;
  const completed = readField<[]>('completed');

  const parsedCompleted = completed.map((completedRef: any) => {
    const name = readField('name', completedRef);
    return name;
  });

  return parsedCompleted.join(', ');
};

const selectTodoName: ReadField = (_, ctx) => {
  const todo = selectTodoById(_, ctx);
  const todoName = ctx.readField<string>('name', todo);

  return todoName;
};

const selectTodoById: ReadField = (_, ctx) => {
  const { readField, args } = ctx;
  if (!args) {
    return;
  }
  const { id } = args;
  if (!id) {
    return;
  }
  const todos = readField<[]>('items');
  const todo: any = todos.find((todoRef: any) => {
    const todoId = readField('id', todoRef);
    return todoId === id;
  });

  return todo;
};

const selectTodoDone: ReadField = (_, ctx) => {
  const todo = selectTodoById(_, ctx);
  const isDone = ctx.readField('done', todo);

  return isDone;
};

const cache = new InMemoryCache({
  typePolicies: {
    Todos: {
      fields: {
        completed: selectCompleted,
        completedName: selectCompleteName,
        getTodoById: selectTodoById,
        todoName: selectTodoName,
        todoDone: selectTodoDone,
      },
    },
  },
});

const typeDefs = gql`
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

export const client = new ApolloClient({
  cache,
  resolvers: {},
  typeDefs,
});

// @ts-ignore
window.apollo = client;

client.addResolvers({
  Mutation: {
    addTodo(_, _variables, ctx) {
      const query = todoQueryRegistry.getTodoItems;
      const data = ctx.cache.readQuery({
        query,
      });

      const newTodo = creatoTodo(_variables.name, false);
      const newData = produce(data, (draftData: any) => {
        draftData.todos.items.push(newTodo);
      });

      ctx.cache.writeQuery({
        query,
        data: newData,
      });

      return newTodo;
    },
    toggleTodo(_, variables, { cache }) {
      const id = `TodoItem:${variables.id}`;

      const fragment = todoFragmentRegistry.getTodoItemDone;

      const todoItem = cache.readFragment({ fragment, id });

      const newItem = produce(todoItem, (draftData: any) => {
        draftData.done = !draftData.done;
      });

      cache.writeFragment({
        id,
        fragment,
        data: newItem,
      });
    },
  },
});

let counter = 0;
const creatoTodo = (name: string, done: boolean = false) => ({
  id: counter += 1,
  name,
  done,
  __typename: 'TodoItem',
});

cache.writeData({
  data: {
    todos: new TodosModel(),
  },
});
