import React, { useState, createContext, useEffect } from 'react';

// Router
import PrivateRoute from '../PrivateRoute';
import { Switch, Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';

// Axios
import Axios from '../../../services/axiosConfig';
import { SEARCH_MESSAGES, SHOW_ACCOUNT } from '../../../services/requests';
import {
  setFilterQueryToLocalStorage,
  getFilterQueryFromLocalStorage
} from '../../../localStorageUtils/queryManager';
import emptyQuery from './emptyQuery';

// Children
import MessagesLayout from './MessagesLayout';
import MessageMain from '../Message/MessageMain';
import GenericNotFound from '../GenericNotFound';
import keywordFilterBuilderAND from '../../../util/filterConstructors/keywordFilterBuilderAND';

export const AccountContext = createContext(null);

// TODO: Good candidate for a Reducer.

const MessagesMain = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [messages, setMessages] = useState();
  const [query, setQueryLocally] = useState(getFilterQueryFromLocalStorage() || emptyQuery);
  const [filterQuery, setFilterQuery] = useState(getFilterQueryFromLocalStorage() || emptyQuery);
  const [messagesTotalCount, setMessagesTotalCount] = useState();
  const [listPlaceholder, setListPlaceholder] = useState();
  const [messageCursor, setMessageCursor] = useState();

  const [pageInfo, setPageInfo] = useState({});
  const [facets, setFacets] = useState({});

  const { path } = useRouteMatch();

  useEffect(() => {
    Axios.get(`${SHOW_ACCOUNT}${accountId}/`).then(response => {
      setAccount(response.data);
    });
  }, []);

  useEffect(() => {
    searchMessages();
  }, [query]);

  const searchMessages = () => {
    setLoading(true);
    const accountParam = `account=${accountId}&`;
    const queryParams = constructQueryString(query);
    const url = SEARCH_MESSAGES + accountParam + queryParams;
    Axios.get(url)
      .then(response => {
        updateResults(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.warn('ERROR searching Messages: ', error);
        setError(error);
        setLoading(false);
      });
  };

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

  const getProcessedParam = processedStatus => {
    let status = false;
    if (processedStatus === 'All') return '';
    if (processedStatus === 'Processed') status = true;
    return `processed=${status}`;
  };

  const constructQueryString = queryObj => {
    const { keywords, tags, processedStatus } = queryObj;
    const params = [];

    if (keywords && keywords.length > 0) params.push(keywordFilterBuilderAND(keywords));
    if (tags && tags.length > 0) params.push(''); // TODO: Implement
    if (processedStatus) params.push(getProcessedParam(processedStatus));
    return params.join('&');
  };

  const setQuery = newQuery => {
    setFilterQueryToLocalStorage(newQuery);
    setQueryLocally(newQuery);
  };

  const loadMoreMessages = () => {
    //  TODO: set current offset to localStorage?
    if (pageInfo.next) {
      setLoading(true);
      // const offset = getOffsetFromUrl(pageInfo.next);
      // setFilterQuery({
      //   ...query,
      //   offset
      // });
      Axios.get(pageInfo.next)
        .then(response => {
          updateResults(response.data, true);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      // TODO: Show something indication user has reached the end?
    }
  };

  // const getOffsetFromUrl = url => {
  //   const splitUrl = url.split('/');
  //   const queryParams = splitUrl[splitUrl.length - 1].split('&');
  //   const offsetString = queryParams.find(param => param.includes('offset'));
  //   const newOffset = parseInt(offsetString.split('=')[1]);
  //   return newOffset;
  // };

  const clearFilters = () => {
    setQuery(emptyQuery);
    setFilterQuery(emptyQuery);
  };

  const handleChangeRecordStatus = (records, status) => {
    if (Array.isArray(records)) {
      // TODO: implement bulk record status updates
    } else {
      // const record = records;
      // TODO: Do PUT to update message, run query again in case it needs updating
    }
  };

  const context = {
    account,
    filterQuery,
    setFilterQuery,
    clearFilters,
    messages,
    messagesTotalCount,
    searchMessages,
    query,
    setQuery,
    loadMoreMessages,
    pageInfo,
    facets,
    listPlaceholder,
    setListPlaceholder,
    messageCursor,
    setMessageCursor,
    loading,
    error
  };

  return (
    <AccountContext.Provider value={context}>
      <Switch>
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
      </Switch>
    </AccountContext.Provider>
  );
};

export default React.memo(MessagesMain);
