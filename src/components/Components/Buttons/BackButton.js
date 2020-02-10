import React from 'react';
import styled, { withTheme } from 'styled-components';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Deps
import { lighten } from '../../../styles/styleUtils/lighten-darken';

const BackButton = props => {
  return (
    <BackButtonStyled {...props} data-cy="back_button">
      <FontAwesomeIcon size="xs" icon={faChevronLeft} color={props.theme.colorPrimary} />
      <p>Back</p>
    </BackButtonStyled>
  );
};

const BackButtonStyled = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  p {
    color: ${props => props.theme.colorPrimary};
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 1.5rem;

    &:hover {
      color: ${props => lighten(props.theme.colorPrimary)};
    }
  }
`;

export default withTheme(BackButton);
