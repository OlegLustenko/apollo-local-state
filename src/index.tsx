import * as React from "react";
import { render } from "react-dom";

import { LocalState } from "./LocalState";
import { createClient } from "./state/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";

import "./styles.css";

const rootElement = document.getElementById("root");
const client = createClient();

render(
  <ApolloProvider client={client}>
    <LocalState />
  </ApolloProvider>,
  rootElement
);
