import { ReadField } from "../../../../../../store";

export const selectCompleted: ReadField = (_, ctx) => {
  const { readField } = ctx;
  const todos = readField<[]>('items');

  const completed = todos.filter((todoRef: any) => {
    const isDone = readField('done', todoRef);
    return isDone;
  });

  return completed;
};
