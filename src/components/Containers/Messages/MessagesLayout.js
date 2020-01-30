import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { AccountContext } from './MessagesMain';

// Children
import MessagesHeader from './MessagesHeader';
import FilterPanel from './FilterPanel/FilterPanel';
import MessagesContent from './MessagesContent/MessagesContent';
import NoSearch from './MessagesContent/NoSearch';
import NoContent from './MessagesContent/NoContent';

const MessagesLayout = () => {
  const { messages } = useContext(AccountContext);

  const renderMainContent = () => {
    if (!messages) return <NoSearch />;
    if (messages) {
      if (messages.length === 0) return <NoContent />;
      return <MessagesContent />;
    }
  };

  return (
    <MessagesLayoutStyled>
      <MessagesHeader />
      <ContentWrapper>
        <FilterPanel />
        {renderMainContent()}
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
