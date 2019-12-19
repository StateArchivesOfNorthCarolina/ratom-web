import React from "react";
import styled from "styled-components";
import MessagesHeader from "./MessagesHeader";
import FilterPanel from "./FilterPanel/FilterPanel";
import MessagesContent from "./MessagesContent/MessagesContent";

const MessagesLayout = () => {
  return (
    <MessagesLayoutStyled>
      <MessagesHeader />
      <ContentWrapper>
        <FilterPanel />
        <MessagesContent />
      </ContentWrapper>
    </MessagesLayoutStyled>
  );
};

const MessagesLayoutStyled = styled.section`
  width: 100%;
`;

const ContentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default MessagesLayout;
