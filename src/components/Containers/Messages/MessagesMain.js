import React, { useState, createContext, useEffect } from 'react';

// Router
import PrivateRoute from '../PrivateRoute';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory
} from 'react-router-dom';

// Axios
import Axios from '../../../services/axiosConfig';
import { SEARCH_MESSAGES, SHOW_ACCOUNT } from '../../../services/requests';
import {
  setFilterQueryToLocalStorage,
  getFilterQueryFromLocalStorage
} from '../../../localStorageUtils/queryManager';
import emptyQuery from './emptyQuery';

// ls
import { RECORDS_REQUEST_QUERY } from '../../../constants/localStorageConstants';
import { setValueToLocalStorage } from '../../../localStorageUtils/localStorageManager';

// Util
import {
  keywordFilterBuilderOR,
  emailFilterBuilderOR,
  dateRangeFilterBuilderAND,
  folderFilterBuilderOR,
  labelFilterBuilderOR,
  processedStatusBuilder,
  recordStatusBuilder
} from '../../../util/filterConstructors';

// Children
import MessagesLayout from './MessagesLayout';
import MessageMain from '../Message/MessageMain';
import GenericNotFound from '../GenericNotFound';

export const AccountContext = createContext(null);

// TODO: Good candidate for a Reducer.

const MessagesMain = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [messages, setMessages] = useState();
  const [query, setQueryLocally] = useState(getFilterQueryFromLocalStorage(accountId));
  const [filterQuery, setFilterQuery] = useState(getFilterQueryFromLocalStorage(accountId));
  const [messagesTotalCount, setMessagesTotalCount] = useState();
  const [listPlaceholder, setListPlaceholder] = useState();
  const [messageCursor, setMessageCursor] = useState();
  const [checkedMessages, setCheckedMessages] = useState([]);

  const [pageInfo, setPageInfo] = useState({});
  const [facets, setFacets] = useState({});
  const history = useHistory();
  const { state: routerState } = useLocation();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (!routerState || routerState.reset !== false) {
      Axios.get(`${SHOW_ACCOUNT}${accountId}/`).then(response => {
        if (response.data.account_status === 'FA') history.replace('/');
        setAccount(response.data);
      });
    }
  }, [routerState]);

  useEffect(() => {
    if (!routerState || routerState.reset !== false) {
      searchMessages();
    }
  }, [query, routerState]);

  const saveQueryForExport = queryString => {
    // only saves after a successful response to a query
    // This should prevent an export from occurring on "stale" data
    setValueToLocalStorage(RECORDS_REQUEST_QUERY, queryString);
  };

  const searchMessages = () => {
    setLoading(true);
    const accountParam = `account=${accountId}&`;
    const queryParams = constructQueryString(query);
    const url = SEARCH_MESSAGES + accountParam + queryParams;
    Axios.get(url)
      .then(response => {
        saveQueryForExport(accountParam + queryParams);
        updateResults(response.data);
        // deselect any selected messages on successful query
        setCheckedMessages([]);
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

  const constructQueryString = queryObj => {
    const {
      keywords,
      dateRange,
      processedStatus,
      folders,
      recordStatus,
      addresses,
      labels
    } = queryObj;
    const params = [];
    if (keywords && keywords.length > 0) params.push(keywordFilterBuilderOR(keywords));
    if (dateRange && dateRange.length > 0) params.push(dateRangeFilterBuilderAND(dateRange));
    if (processedStatus) params.push(processedStatusBuilder(processedStatus));
    if (folders && folders.length > 0) params.push(folderFilterBuilderOR(folders));
    if (recordStatus) params.push(recordStatusBuilder(recordStatus));
    if (addresses && addresses.length > 0) params.push(emailFilterBuilderOR(addresses));
    if (labels && labels.length > 0) params.push(labelFilterBuilderOR(labels));
    return params.join('&');
  };

  const setQuery = newQuery => {
    // this sets query to local storage
    setFilterQueryToLocalStorage(accountId, newQuery);
    // this triggers an API call
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

  const checkAllMessages = all => {
    if (all) {
      setCheckedMessages(messages.map(m => m.id));
    } else {
      setCheckedMessages([]);
    }
  };

  const checkMessage = messageId => {
    const messageIndex = checkedMessages.indexOf(messageId);
    if (messageIndex > -1) {
      const messagesWithout = [...checkedMessages];
      messagesWithout.splice(messageIndex, 1);
      setCheckedMessages(messagesWithout);
    } else {
      setCheckedMessages([...checkedMessages, messageId]);
    }
  };

  const context = {
    account,
    checkAllMessages,
    checkMessage,
    checkedMessages,
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
