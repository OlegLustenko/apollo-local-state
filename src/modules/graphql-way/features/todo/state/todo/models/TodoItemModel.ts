import { TodoItem } from '../../../../../../../core/entities/Todo';

let counter = 0;
const getUUID = () => counter++;

export class TodoItemModel extends TodoItem {
  constructor(properties?: Partial<TodoItem>) {
    super(properties);
    Object.assign(
      this,
      { id: getUUID(), __typename: 'TodoItem', done: false },
      properties,
    );
  }
}
