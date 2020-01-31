import { ReadField } from "../../../../../../store";
import { selectTodoById } from './select-todo-by-id';

export const selectTodoName: ReadField = (_, ctx) => {
  const todo = selectTodoById(_, ctx);
  if (!todo) {
    return '';
  }

  const todoName = ctx.readField<string>('name', todo);

  return todoName;
};
