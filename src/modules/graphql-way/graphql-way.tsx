import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_COUNTER = gql`
  query Todos {
    todos @client {
      items {
        id
        name
        done
      }
      completed @client {
        id
        name
        done
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) @client
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!, $checked: Boolean!) {
    toggleTodo(id: $id, checked: $checked) @client
  }
`;

function useCounterState() {
  const { data, loading } = useQuery(GET_COUNTER);

  return {
    state: data,
    loading
  };
}

function useCounterActions() {
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);

  return {
    toggleTodo,
    addTodo
  };
}

export const GraphqlWay = ({ id }: { id: string }) => {
  const { state, loading } = useCounterState();
  const { toggleTodo, addTodo } = useCounterActions();
  console.groupCollapsed('graphqlWay', id);
  console.log('state: ', state);
  console.log('loading: ', loading);
  console.groupEnd();

  if (loading) {
    return null;
  }

  if (!state) {
    return <>NO TODOS</>;
  }

  const addTodoHandler = (name: string) => {
    addTodo({ variables: { name } });
  };

  const toggleTodoAction = (id: string) => {
    console.log('toggle');
    toggleTodo({ variables: { id: id } });
  };

  return (
    <div
      style={{
        gridGap: '10px',
        display: 'grid',
        gridTemplateRows: '5fr 2fr'
      }}
    >
      <ul style={{ display: 'block' }}>
        {state.todos.items.map((todo: any, index: number) => (
          <li key={index}>
            <span>
              <input
                type='checkbox'
                checked={todo.done}
                onChange={() => toggleTodoAction(todo.id)}
              />
            </span>{' '}
            {todo.name}
          </li>
        ))}
      </ul>
      {state.todos.completed.map((x: any) => x.name).join(', ')}
      <button
        onClick={() => {
          addTodoHandler('UNZ UNZ UNZ');
        }}
      >
        ADD RANDOM TODO
      </button>
    </div>
  );
};
