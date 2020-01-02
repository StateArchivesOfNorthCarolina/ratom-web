import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider as Apollo } from '@apollo/react-hooks';
import {
  getTokenFromLocalStorage,
  removeUserFromLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorageUtils/authManager';

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
  },
  onError: ({ graphQLErrors }) => {
    // TODO: Handle all general errors here, prolly
    if (graphQLErrors && graphQLErrors.length > 0) {
      if (graphQLErrors[0].message === 'Signature has expired') {
        console.log('User session has expired. Logging out.');
        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
      }
    }
  }
});

const ApolloProvider = props => {
  return <Apollo client={client}> {props.children} </Apollo>;
};

export default ApolloProvider;
