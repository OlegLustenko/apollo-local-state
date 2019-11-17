import * as React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_COUNTER, setCounter } from "./update-counter";

import { selectCounter, GET_COUNTER } from "./select-counter";

import "./styles.css";
import { useState } from "react";

const addToCounter = (value: any) => ({
  query: GET_COUNTER,
  data: {
    counter: value
  }
});

const updateCounter = (
  readQuery: any,
  writeQuery: (arg0: { query: any; data: { counter: any } }) => void
) => ({ value }: {value: any}) => {
  // const counter = selectCounter(readQuery);

  writeQuery(addToCounter(value));
};

const createAction = (action: {
  (readQuery: any, writeQuery: any): ({ value }: { value: any }) => void;
  (arg0: any, arg1: any): (arg0: any) => void;
}) => (_result: any, variables: any, { cache }: any) => {
  const readQuery = cache.readQuery.bind(cache);
  const writeQuery = cache.writeQuery.bind(cache);

  action(readQuery, writeQuery)(variables);
};

const updateCounterAction = createAction(updateCounter);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  clientState: {
    resolvers: {
      Query: {},
      Mutation: {
        updateCounter: updateCounterAction
      }
    },
    defaults: {
      counter: 0,
      counterModifier: 0
    }
  }
});

function useAppActions() {
  const [updateCounter, { data }] = useMutation(UPDATE_COUNTER);

  return {
    addToCounter: setCounter(updateCounter, data),
    setCounter: setCounter(updateCounter, data)
  };
}

function useApp() {
  const { data, loading } = useQuery(GET_COUNTER);
  const { addToCounter, setCounter } = useAppActions();

  return {
    counter: loading ? 0 : data.counter,
    addToCounter,
    setCounter
  };
}

function App() {
  const { counter, addToCounter, setCounter } = useApp();

  const increment = () => {
    addToCounter(counter + 1);
  };

  const decrement = () => {
    addToCounter(counter - 1);
  };

  const [value, setValue] = useState(0);
  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "10px"
      }}
    >
      <button onClick={increment}>INCREMENT</button>
      <div>Counter: {counter}</div>
      <button onClick={decrement}>DECREMENT</button>
      <input
        placeholder="increment on"
        value={value}
        onChange={event => {
          setValue(+event.target.value);
        }}
      />
      <button
        onClick={() => {
          setCounter(value);
          setValue(0);
        }}
      >
        Submit Increment
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
