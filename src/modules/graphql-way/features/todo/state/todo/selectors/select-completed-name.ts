import { ReadField } from "../../../../../../store";


export const selectCompletedName: ReadField = (_, ctx) => {
  const { readField } = ctx;
  const completed = readField<[]>('completed');

  const parsedCompleted = completed.map((completedRef: any) => {
    const name = readField('name', completedRef);
    return name;
  });

  return parsedCompleted.join(', ');
};
