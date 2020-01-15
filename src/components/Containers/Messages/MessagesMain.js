import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';

// Router
import PrivateRoute from '../PrivateRoute';
import { Route, Redirect, useParams, useRouteMatch } from 'react-router-dom';

// Util
import { getDocCountFromFacets } from '../../../util/getDocCountFromFacets';

// Axios
import { useLazyAxios } from '../../Hooks/useAxios';
import { searchMessages } from '../../../services/requests';
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
  const [listPlaceholder, setListPlaceholder] = useState();
  const [messageCursor, setMessageCursor] = useState();

  const [pageInfo, setPageInfo] = useState({});
  const [facets, setFacets] = useState({});

  const { path } = useRouteMatch();
  const { collectionId } = useParams();

  const [executeSearchMessages, { loading, error, fetchMore }] = useLazyAxios(searchMessages, {
    onCompleted: data => {
      console.log('Search messages, a lot...');
      const { results, facets, next, previous, count } = data;
      setMessages(results);
      setFacets(facets);
      setPageInfo({ next, previous, count });
    }
  });

  useEffect(() => {
    console.log('MessagesMain useEffect runs and FETCHES MESSAGES');
    const previousQuery = getFilterQueryFromLocalStorage();
    if (previousQuery) {
      queryMessages();
    }
  }, []);

  useEffect(() => {
    setMessagesTotalCount(getDocCountFromFacets(facets));
  }, [facets]);

  const setCollection = () => {
    setCollectionId(collectionId);
  };

  const setQuery = newQuery => {
    setFilterQueryToLocalStorage(newQuery);
    setQueryLocally(newQuery);
  };

  const buildKeywordSearch = () => {
    const { keywords } = query;
    return `keywords.join('&search=')`;
  };

  const buildFilterSearch = () => {
    // const { filters } = query;
    return '';
  };

  const queryMessages = () => {
    const search = buildKeywordSearch();
    const filter = buildFilterSearch();

    const params = search + filter;
    executeSearchMessages(collectionId, params);
  };

  const loadMoreMessages = () => {
    //  TODO: set current "after" cursor position to state, possibly localStorage
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            filterMessages: {
              ...prev.filterMessages,
              edges: [...prev.filterMessages.edges, ...fetchMoreResult.filterMessages.edges],
              facets: { ...fetchMoreResult.filterMessages.facets },
              pageInfo: { ...fetchMoreResult.filterMessages.pageInfo }
            }
          };
        }
      });
    } else console.log('ALL OUT, SON');
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
    listPlaceholder,
    setListPlaceholder,
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
