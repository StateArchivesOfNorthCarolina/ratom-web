import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lighten } from '../../../styles/styleUtils/lighten-darken';

const CloseButton = props => {
  return <CloseButtonStyled icon={faTimes} {...props} />;
};

const CloseButtonStyled = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colorPrimary};
  font-size: 4rem;
  cursor: pointer;

  &:hover {
    color: ${props => lighten(props.theme.colorPrimary)};
  }
`;

export default CloseButton;
