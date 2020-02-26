import React from 'react';
import styled from 'styled-components';
import { colorBadgeBlue, colorBadgeGreen, colorBadgeRed } from '../../../styles/styleVariables';

import { darken } from '../../../styles/styleUtils/lighten-darken';

const Badge = ({ name, remove, ...props }) => {
  return (
    <BadgeStyled {...props} data-cy="badge">
      <p>{name}</p>
      {remove && (
        <IconStyled onClick={remove} data-cy="badge_close">
          x
        </IconStyled>
      )}
    </BadgeStyled>
  );
};

const BadgeStyled = styled.div`
  max-width: 100%;
  height: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  margin: 0 2px 2px 0;
  border-radius: 1px;

  p:first-of-type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 1.5rem;

    color: ${props => props.theme.textColorLight};
    font-size: 1rem;
  }

  background-color: ${props => {
    switch (props.type) {
      case 'importer':
        return colorBadgeGreen;
      default:
        return colorBadgeBlue;
    }
  }};
`;

const IconStyled = styled.p`
  color: ${props => props.theme.textColorLight};
  font-size: 1rem;
  margin-left: 1rem;
  align-self: center;
  cursor: pointer;
  padding-right: 0.6rem;

  &:hover {
    color: ${props => darken(props.theme.textColorLight)};
  }
`;

export default Badge;
