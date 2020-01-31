import { TodoItemModel } from './TodoItemModel';

export interface TodosModel {
  items: TodoItemModel[];
  completed: TodoItemModel[];
  isLoading: false;
}

export class TodosModel {
  constructor(properties?: Partial<TodosModel>) {
    Object.assign(
      this,
      {
        __typename: 'Todos',
        items: [new TodoItemModel({ name: 'Migrate to Apollo' })],
        completed: [],
        isLoading: false,
      },
      properties,
    );
  }
}
