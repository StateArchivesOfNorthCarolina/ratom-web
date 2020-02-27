import React from 'react';
import styled from 'styled-components';
// import { colorBadgeBlue, colorBadgeGreen, colorBadgeRed } from '../../../styles/styleVariables';

import { darken } from '../../../../../styles/styleUtils/lighten-darken';
import { colorBlackLight } from '../../../../../styles/styleVariables';

const Keyword = ({ name, remove, ...props }) => {
  return (
    <KeywordStyled {...props} data-cy="keyword">
      <p>{name}</p>
      {remove && (
        <IconStyled onClick={remove} data-cy="keyword_close">
          x
        </IconStyled>
      )}
    </KeywordStyled>
  );
};

const KeywordStyled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 2px 0 0 2px;
  border-radius: 1rem;
  background-color: whitesmoke;

  p:first-of-type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.5rem 1.5rem;

    color: ${colorBlackLight};
    font-size: 1.5rem;
  }
`;

const IconStyled = styled.p`
  color: ${colorBlackLight};
  font-size: 1.5rem;
  margin-left: 1rem;
  align-self: center;
  cursor: pointer;
  padding-right: 1rem;

  &:hover {
    color: ${darken(colorBlackLight)};
  }
`;

export default Keyword;
