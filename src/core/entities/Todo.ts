type GUID = string;

export interface TodoItem {
  id: GUID;
  done: boolean;
  name: string;
}

export class TodoItem {
  constructor(params: Partial<TodoItem>) {
    Object.assign(
      this,
      {
        id: undefined,
        done: false,
        name: undefined
      },
      params
    );
  }
}
