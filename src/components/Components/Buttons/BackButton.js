import React from 'react';
import styled, { withTheme } from 'styled-components';

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// Deps
import tinycolor from "tinycolor2";
import { lighten } from '../../../styles/styleUtils/lighten-darken';
import { standardLighten } from '../../../styles/styleVariables';


const BackButton = props => {
    console.log(tinycolor(props.theme.colorPrimary).lighten(40).toString());
    return (
      <BackButtonStyled {...props}>
        <FontAwesomeIcon
          size='xs'
          icon={faChevronLeft}
          color={props.theme.colorPrimary}
        />
        <p>Back</p>
      </BackButtonStyled>
    );
}

const BackButtonStyled = styled.span`
  margin-left: 8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  p {
    color: ${props => props.theme.colorPrimary};
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 2rem;

    &:hover {
      color: ${props => lighten(props.theme.colorPrimary)};
    }
  }
`;

export default withTheme(BackButton);
