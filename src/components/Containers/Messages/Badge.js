import React from 'react';
import styled from 'styled-components';
import { colorBadgeBlue, colorBadgeGreen, colorBadgeRed } from '../../../styles/styleVariables';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { darken } from '../../../styles/styleUtils/lighten-darken';

const Badge = ({ remove, ...props }) => {
  let name;
  if (props.name) {
    name = props.name;
  } else {
    console.log('props: ', props);
  }
  return (
    <BadgeStyled {...props}>
      <p>{name}</p>
      <IconStyled icon={faTimes} onClick={remove} />
    </BadgeStyled>
  );
};

const BadgeStyled = styled.div`
  max-width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 2px 0 0 2px;
  padding: 1.5rem;

  p {
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: ${props => props.theme.textColorLight};
    font-size: 1.5rem;
  }

  /* //! This is temporary! These are just guesses. vvv */
  background-color: ${props => {
    switch (props.type) {
      case 'normal':
        return colorBadgeBlue;
      case 'restricted':
        return colorBadgeRed;
      case 'nlp':
        return colorBadgeGreen;
      default:
        return colorBadgeBlue;
    }
  }};
`;

const IconStyled = styled(FontAwesomeIcon)`
  color: ${props => props.theme.textColorLight};
  font-weight: bold;
  font-size: 1.2rem;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    color: ${props => darken(props.theme.textColorLight)};
  }
`;

export default Badge;
