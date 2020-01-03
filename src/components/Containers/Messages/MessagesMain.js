import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';

// Router
import PrivateRoute from '../PrivateRoute';
import { Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

// Fetch
import { useLazyQuery } from '@apollo/react-hooks';
import {
  setFilterQueryToLocalStorage,
  getFilterQueryFromLocalStorage
} from '../../../localStorageUtils/queryManager';
import { FILTER_MESSAGES } from '../../../graphql/queries/messageQueries';
import emptyQuery from './emptyQuery';

// Util
import { getDocCountFromFacets } from '../../../util/getDocCountFromFacets';

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
  const [query, setQueryLocally] = useState(getFilterQueryFromLocalStorage() || emptyQuery);

  const [pageInfo, setPageInfo] = useState();
  const [facets, setFacets] = useState({});

  const { path } = useRouteMatch();
  const { collectionId } = useParams();

  const [sendMessagesQuery, { called, loading, error, fetchMore }] = useLazyQuery(FILTER_MESSAGES, {
    onCompleted: data => {
      const { edges, facets, pageInfo } = data.filterMessages;
      console.log('doc count: ', getDocCountFromFacets(facets));
      setMessages(edges);
      setFacets(facets);
      setPageInfo(pageInfo);
    }
  });

  useEffect(() => {
    const previousQuery = getFilterQueryFromLocalStorage();
    if (previousQuery) {
      queryMessages();
    }
  }, []);

  const setCollection = () => {
    setCollectionId(collectionId);
  };

  const setQuery = newQuery => {
    setFilterQueryToLocalStorage(newQuery);
    setQueryLocally(newQuery);
  };

  const queryMessages = () => {
    const variables = {
      collectionId,
      search: { query: 'taste' }
    };
    sendMessagesQuery({ variables });
  };

  const loadMoreMessages = () => {
    //  TODO: set current "after" cursor position to state, possibly localStorage
    // console.log('pageInfo.endCursor: ', pageInfo.endCursor);
    // console.log('LOADING MESSAGES!!');
    console.log('fetching more after pageInfo: ', pageInfo);
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: { after: pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult, ..._rest }) => {
          if (!fetchMoreResult) return prev;
          console.log('New endCursor:', fetchMoreResult.filterMessages.pageInfo.endCursor);
          console.log('New edges:', fetchMoreResult.filterMessages.edges);
          setMessages([...prev.filterMessages.edges, ...fetchMoreResult.filterMessages.edges]);
          setFacets(fetchMoreResult.filterMessages.facets);
          setPageInfo(fetchMoreResult.filterMessages.pageInfo);
        }
      });
    } else console.log('ALL OUT, SON');
  };

  console.log('endCursor: ', pageInfo && pageInfo.endCursor);

  return (
    <CollectionContext.Provider
      value={{
        collection,
        setCollection,
        messages,
        queryMessages,
        query,
        setQuery,
        loadMoreMessages,
        pageInfo,
        loading,
        called,
        error
      }}
    >
      <StyledAnimatedSwitch>
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
      </StyledAnimatedSwitch>
    </CollectionContext.Provider>
  );
};

const StyledAnimatedSwitch = styled(AnimatedSwitch)`
  display: flex;
  flex: 1;
`;

export default React.memo(MessagesMain);
