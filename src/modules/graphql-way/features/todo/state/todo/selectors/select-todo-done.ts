import { ReadField } from "../../../../../../store";
import { selectTodoById } from './select-todo-by-id';

export const selectTodoDone: ReadField = (_, ctx) => {
  const todo = selectTodoById(_, ctx);
  const isDone = ctx.readField('done', todo);

  return isDone;
};
