import {
  todoFragmentRegistry,
  todoQueryRegistry,
} from '../todo-querries-registry';
import { produce } from 'immer';
import { TodosModel } from '../models/TodosModel';
import { TodoItemModel } from '../models/TodoItemModel';
import { ApolloClientInitialized } from '../../../../../../store';

export type TodoModelState = {
  todos: TodosModel;
};

const todoInitialState = new TodosModel();

export const initializeTodoRootResolvers = (
  apolloClient: ApolloClientInitialized,
) => {
  apolloClient.writeData({
    data: {
      todos: todoInitialState,
    },
  });

  apolloClient.addResolvers({
    Mutation: {
      addTodo(_, _variables, ctx) {
        const query = todoQueryRegistry.getTodoItems;
        const data = ctx.cache.readQuery({
          query,
        });

        const newTodo = new TodoItemModel({ name: _variables.name });
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
};
