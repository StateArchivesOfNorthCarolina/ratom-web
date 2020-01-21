import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';

// Router
import PrivateRoute from '../PrivateRoute';
import { Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

// Axios
import { useLazyAxios } from '../../Hooks/useAxios';
import { searchMessages, stepThroughPaginatedMessages } from '../../../services/requests';
import {
  setFilterQueryToLocalStorage,
  getFilterQueryFromLocalStorage
} from '../../../localStorageUtils/queryManager';
import emptyQuery from './emptyQuery';

// Components
import AnimatedSwitch from '../../Components/Animated/AnimatedSwitch';

// Children
import MessagesLayout from './MessagesLayout';
import MessageMain from '../Message/MessageMain';
import GenericNotFound from '../GenericNotFound';

export const CollectionContext = createContext(null);

const MessagesMain = () => {
  const [collection, setCollectionId] = useState();
  const [messages, setMessages] = useState([]);
  const [query, setQueryLocally] = useState(getFilterQueryFromLocalStorage() || emptyQuery);
  const [messagesTotalCount, setMessagesTotalCount] = useState();
  const [messageIndex, setMessageIndex] = useState();
  const [messageCursor, setMessageCursor] = useState();

  const [pageInfo, setPageInfo] = useState({});
  const [facets, setFacets] = useState({});

  const { path } = useRouteMatch();
  const { collectionId } = useParams();

  const [executeSearchMessages, { loading, error }] = useLazyAxios(searchMessages, {
    onCompleted: data => {
      updateResults(data);
    }
  });

  useEffect(() => {
    const previousQuery = getFilterQueryFromLocalStorage();
    if (previousQuery) {
      queryMessages(4);
    }
  }, []);

  const updateResults = (data, merge) => {
    const { results, facets, next, previous, count } = data;
    setFacets(facets);
    setPageInfo({ next, previous, count });
    setMessagesTotalCount(count);
    if (merge) {
      setMessages([...messages, ...results]);
    } else {
      setMessages(results);
    }
  };

  const setCollection = () => {
    setCollectionId(collectionId);
  };

  const setQuery = newQuery => {
    setFilterQueryToLocalStorage(newQuery);
    setQueryLocally(newQuery);
  };

  const buildSearchLimit = () => {
    const { limit } = query;
    if (limit) return `limit=${limit}`;
    return 'limit=4';
  };

  const buildKeywordSearch = () => {
    const { keywords } = query;
    if (keywords) return `search=${keywords.join('&search=')}`;
    return '';
  };

  const buildFilterSearch = () => {
    // const { filters } = query;
    return '';
  };

  const queryMessages = defaultLimit => {
    const limit = buildSearchLimit();
    const search = buildKeywordSearch();
    const filter = buildFilterSearch();
    const params = [limit, search, filter];
    executeSearchMessages(collectionId, params.join('&'));
  };

  const loadMoreMessages = () => {
    //  TODO: set current offset to localStorage?
    if (pageInfo.next) {
      stepThroughPaginatedMessages(pageInfo.next).then(response => {
        updateResults(response.data, true);
      });
    } else console.log('ALL OUT');
  };

  const context = {
    collection,
    setCollection,
    messages,
    messagesTotalCount,
    queryMessages,
    query,
    setQuery,
    loadMoreMessages,
    pageInfo,
    messageIndex,
    setMessageIndex,
    messageCursor,
    setMessageCursor,
    loading,
    error
  };

  return (
    <CollectionContext.Provider value={context}>
      <StyledAnimatedSwitch>
        <PrivateRoute exact path={path}>
          <MessagesLayout />
        </PrivateRoute>
        <PrivateRoute path={`${path}/messages/:messageId`}>
          <MessageMain />
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
