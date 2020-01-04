import { TodoItem } from '../../../../../../core/entities/Todo';

export interface TodosModel {
  items: TodoItem[];
  completed: TodoItem[];
}

export class TodosModel {
  constructor(properties?: Partial<TodosModel>) {
    Object.assign(
      this,
      { __typename: 'Todos', items: [], completed: [], isLoading: false },
      properties,
    );
  }
}
