import ApolloClient, { InMemoryCache } from "apollo-boost";
import { selectNextCounterValue } from "../../select-counter";
import {
  updateCounterAction,
  updateCounterUpdaterAction
} from "../../update-counter-actions";
import { updateNextCounterValueAction } from "../counter/set-next-counter-mutation";

const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache,
  resolvers: {
    Query: {
      nextCounterValue: (www, _values, { client }) => {
        console.log(_values);
        return selectNextCounterValue(client.query);
      }
    },
    Mutation: {
      updateCounter: updateCounterAction,
      updateCounterUpdater: updateCounterUpdaterAction,
      updateNextCounterMutation: updateNextCounterValueAction
    }
  }
});

cache.writeData({
  data: {
    counter: 0,
    counterUpdater: 1
  }
});
