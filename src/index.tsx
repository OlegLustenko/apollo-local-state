import * as React from "react";
import { render } from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import {
  ApolloProvider,
  useQuery,
  useMutation,
  useApolloClient
} from "@apollo/react-hooks";
import {
  UPDATE_COUNTER,
  setCounter,
  UPDATE_COUNTER_UPDATER,
  updateCounterUpdater
} from "./update-counter";

import {
  selectCounter,
  GET_COUNTER,
  GET_COUNTER_VIEW_MODEL,
  selectNextCounterValue
} from "./select-counter";

import "./styles.css";
import { useState } from "react";

const addToCounter = (value: number) => ({
  data: {
    query: GET_COUNTER,
    counter: value
  }
});

const addToCounterUpdater = (value: number) => {
  return {
    data: {
      query: GET_COUNTER,
      counterUpdater: value
    }
  };
};

const setNextCounterValueCreator = (value: number) => ({
  data: {
    query: GET_COUNTER,
    nextCounterValue: value
  }
});

const updateCounter = (writeData: any, query?: any) => ({
  value
}: {
  value: any;
}) => {
  console.dir(addToCounter(value));
  writeData(addToCounter(value));
};

const setCounterUpdater = (writeData: any, query?: any) => ({
  value
}: {
  value: any;
}) => {
  writeData(addToCounterUpdater(value));
};

const setNextCounterValue = (writeData: any, query: any) => async () => {
  const nextCounterValue = await selectNextCounterValue(query);
  console.log(setNextCounterValueCreator(nextCounterValue));
  writeData(setNextCounterValueCreator(nextCounterValue));
};

const createMutation = (action: any) => (_result: any, variables: any, { client }: {client: any}) => {
  const query = client.readQuery;
  const writeData = client.writeData.bind(client);

  action(writeData, query)(variables);
};

const updateCounterAction = createMutation(updateCounter);
const updateCounterUpdaterAction = createMutation(setCounterUpdater);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  clientState: {
    resolvers: {
      Query: {
        counter() {
          return 0;
        },
        counterUpdater() {
          return 0;
        },
        nextCounterValue: async (www, _values, { client }) => {
          return selectNextCounterValue(client.query);
        }
      },
      Mutation: {
        updateCounter: updateCounterAction,
        updateCounterUpdater: updateCounterUpdaterAction
      }
    }
  }
});

const createAction = (apolloClient: typeof client) => (action: any) => {
  const writeData = apolloClient.writeQuery.bind(client);
  const query = apolloClient.query;

  return action(query, writeData);
};

const bindClientToAction = createAction(client);

const setNextCounterValueAction = bindClientToAction(setNextCounterValue);

function useAppActions() {
  const [updateCounter, { data }] = useMutation(UPDATE_COUNTER);
  const [mutationCounter] = useMutation(UPDATE_COUNTER_UPDATER);

  return {
    addToCounter: setCounter(updateCounter, data),
    setCounter: setCounter(updateCounter, data),
    setUpdater: updateCounterUpdater(mutationCounter)
  };
}

function useApp() {
  const { data, loading } = useQuery(GET_COUNTER_VIEW_MODEL);
  const { addToCounter, setCounter, setUpdater } = useAppActions();
  const client = useApolloClient();

  React.useEffect(() => {
    client.watchQuery({ query: GET_COUNTER }).subscribe(value => {
      // setNextCounterValueAction(value);
    });
  }, [client]);

  console.log(data);
  return {
    counter: loading ? 0 : data.counter,
    counterUpdater: loading ? 0 : data.counterUpdater,
    nextCounterValue: loading ? 0 : data.nextCounterValue,
    addToCounter,
    setCounter,
    setUpdater
  };
}

function App() {
  const {
    counter,
    addToCounter,
    setCounter,
    nextCounterValue,
    counterUpdater,
    setUpdater
  } = useApp();

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
      <div>
        Counter: {counter} <b>next: {nextCounterValue}</b>
      </div>
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
          setUpdater(value);
          setValue(0);
        }}
      >
        Submit Increment
      </button>
      <div>Counter updater: {counterUpdater}</div>
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
