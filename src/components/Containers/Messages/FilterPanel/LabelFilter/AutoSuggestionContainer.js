import React from 'react';
import styled from 'styled-components';
import { colorWhite, boxShadow, colorBlack } from '../../../../../styles/styleVariables';

const AutoSuggestionContainer = ({ containerProps, children }) => {
  return (
    <AutoSuggestionContainerStyled {...containerProps}>{children}</AutoSuggestionContainerStyled>
  );
};

const AutoSuggestionContainerStyled = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  background-color: ${colorWhite};
  box-shadow: ${boxShadow};

  & p {
    margin: 1rem 0;
    white-space: nowrap;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    color: ${colorBlack};
  }
`;

export default AutoSuggestionContainer;
