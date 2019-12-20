import React, { useState, createContext } from 'react';

// Router
import PrivateRoute from '../PrivateRoute';
import { Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

// Fetch
import { useLazyQuery } from '@apollo/react-hooks';
import { setFilterQueryToLocalStorage } from '../../../localStorageUtils/queryManager';
import { FILTER_MESSAGES } from '../../../graphql/queries/messageQueries';

// Components
import AnimatedSwitch from '../../Components/Animated/AnimatedSwitch';

// Children
import MessagesLayout from './MessagesLayout';
import MessageLayout from '../Message/MessageLayout';
import GenericNotFound from '../GenericNotFound';

export const CollectionContext = createContext(null);

const MessagesMain = () => {
  const [collection, setCollectionId] = useState();
  const [messages, setMessages] = useState([]);
  const [query, setQueryLocally] = useState({});
  const [pageInfo, setPageInfo] = useState();
  const [facets, setFacets] = useState({});

  const { path } = useRouteMatch();
  const { collectionId } = useParams();

  const [sendMessagesQuery, { called, loading, error, fetchMore }] = useLazyQuery(FILTER_MESSAGES, {
    onCompleted(data) {
      const { edges, facets, pageInfo } = data.filterMessages;
      setMessages(edges);
      setFacets(facets);
      setPageInfo(pageInfo);
    }
  });

  const setCollection = () => {
    setCollectionId(collectionId);
  };

  const setQuery = query => {
    setFilterQueryToLocalStorage(query);
    setQueryLocally(query);
  };

  const queryMessages = () => {
    // TODO: - use query to serialize the JS object 'query' in to the format we need
    // TODO: - for the gql FILTER_MESSAGES query to run properly
    // TODO: user query or getFilterQueryFromLocalStorage();
    const variables = {
      collectionId,
      keyword: 'energy'
    };
    sendMessagesQuery({
      variables
    });
  };

  return (
    <CollectionContext.Provider
      value={{
        collection,
        setCollection,
        messages,
        queryMessages,
        query,
        setQuery,
        fetchMore,
        pageInfo,
        loading,
        called,
        error
      }}
    >
      <AnimatedSwitch>
        <PrivateRoute exact path={path}>
          <MessagesLayout />
        </PrivateRoute>
        <PrivateRoute path={`${path}/messages/:messageId`}>
          <MessageLayout />
        </PrivateRoute>
        <Route path="/404">
          <GenericNotFound />
        </Route>
        <Redirect to="/404" />
      </AnimatedSwitch>
    </CollectionContext.Provider>
  );
};

export default React.memo(MessagesMain);
