import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// service worker
import * as serviceWorker from './serviceWorker';
import { getTokenFromLocalStorage } from './localStorageUtils/authManager';

const client = new ApolloClient({
  uri: '/graphql',
  request: operation => {
    const token = getTokenFromLocalStorage();
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : ''
      }
    });
    const { operationName, variables, query } = operation;
    console.log(`Executing: ${operationName}`);
    console.log('Variables: ', variables);
    console.log('Query: ', query);
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
