import * as React from "react";
import { render } from "react-dom";

import { client } from "./state/apollo/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./app";

import "./styles.css";

const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
