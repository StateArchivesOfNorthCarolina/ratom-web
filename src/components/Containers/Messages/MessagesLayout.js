import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';

// // Router
// import { useParams } from 'react-router-dom';

// Context
import { CollectionContext } from './MessagesMain';

// Children
import MessagesHeader from './MessagesHeader';
import FilterPanel from './FilterPanel/FilterPanel';
import MessagesContent from './MessagesContent/MessagesContent';
import NoSearch from './MessagesContent/NoSearch';

// // Fetch
// import { useLazyQuery } from '@apollo/react-hooks';
// import { setFilterQueryToLocalStorage } from '../../../localStorageUtils/queryManager';
// import { FILTER_MESSAGES } from '../../../graphql/queries/messageQueries';

// export const CollectionContext = createContext(null);

const MessagesLayout = () => {
  const { messages } = useContext(CollectionContext);
  // console.log('MessagesLayout Renders!!');
  // const [collection, setCollectionId] = useState();
  // const [messages, setMessages] = useState([]);
  // const [query, setQueryLocally] = useState({});
  // const [pageInfo, setPageInfo] = useState();
  // const [facets, setFacets] = useState({});
  // const { collectionId } = useParams();

  // const [sendMessagesQuery, { called, loading, error, fetchMore }] = useLazyQuery(FILTER_MESSAGES, {
  //   onCompleted(data) {
  //     const { edges, facets, pageInfo } = data.filterMessages;
  //     setMessages(edges);
  //     setFacets(facets);
  //     setPageInfo(pageInfo);
  //   }
  // });

  // const setCollection = () => {
  //   setCollectionId(collectionId);
  // };

  // const setQuery = query => {
  //   setFilterQueryToLocalStorage(query);
  //   setQueryLocally(query);
  // };

  // const queryMessages = () => {
  //   // TODO: - use query to serialize the JS object 'query' in to the format we need
  //   // TODO: - for the gql FILTER_MESSAGES query to run properly
  //   const variables = {
  //     collectionId,
  //     keyword: 'energy'
  //   };
  //   sendMessagesQuery({
  //     variables
  //   });
  // };

  // console.log('MESSAGES: ', messages);

  // const showLoading = called && loading;

  return (
    <MessagesLayoutStyled>
      <MessagesHeader />
      <ContentWrapper>
        <FilterPanel />
        {messages.length > 0 ? <MessagesContent /> : <NoSearch />}
      </ContentWrapper>
    </MessagesLayoutStyled>
  );
};

const MessagesLayoutStyled = styled.section`
  width: 100%;
`;

const ContentWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
`;

export default MessagesLayout;
