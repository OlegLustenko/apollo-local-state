import React from 'react';
import { render } from 'react-dom';

import { GraphqlSingleLocalStateRoot } from './modules/graphql-single-local-state/graphql-single-local-state-root';
import { GraphqlWayRoot } from './modules/graphql-way/graphql-way-root';
import './styles.css';

const rootElement = document.getElementById('root');

render(
  <>
    <GraphqlSingleLocalStateRoot />
    <GraphqlSingleLocalStateRoot />
    <GraphqlSingleLocalStateRoot />
    <hr />
    <GraphqlWayRoot />
  </>,
  rootElement
);
