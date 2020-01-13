import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { CollectionContext } from './MessagesMain';

// Children
import MessagesHeader from './MessagesHeader';
import FilterPanel from './FilterPanel/FilterPanel';
import MessagesContent from './MessagesContent/MessagesContent';
import NoSearch from './MessagesContent/NoSearch';

const MessagesLayout = () => {
  const { messages } = useContext(CollectionContext);
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
  flex: 1;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export default MessagesLayout;
