import { ReadField } from "../../../../../../store";

export const selectTodoById: ReadField = (_, ctx) => {
  const { readField, args } = ctx;

  if (!args) {
    return;
  }
  const { id } = args;
  if (id === undefined || id === null) {
    return;
  }

  const todos = readField<[]>('items');
  const todo: any = todos.find((todoRef: any) => {
    const todoId = readField('id', todoRef);
    return todoId === id;
  });

  return todo;
};
