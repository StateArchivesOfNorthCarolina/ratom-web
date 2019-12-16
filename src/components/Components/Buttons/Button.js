import React from 'react';
import styled from 'styled-components';


const ButtonStyled = styled.button`
  padding: 1rem 2rem;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 5px;

  display: ${props => (props.block ? "block" : "inline-block")};
  background-color: ${props => {
    if (props.positive) {
      return props.theme.colorPrimary;
    }

    if (props.neutral) {
      return props.theme.colorWhite;
    }

    if (props.negative) {
      return props.theme.colorCaution;
    }

    return props.theme.colorPrimary;
  }};

  color: ${props => {
    if (props.positive) {
      return props.theme.textColorLight;
    }

    if (props.neutral) {
      return props.theme.colorPrimary;
    }

    if (props.negative) {
      return props.theme.textColorLight;
    }

    return props.theme.textColorLight;
  }};

  border: ${props => props.neutral ? `2px solid ${props.theme.colorPrimary}` : "none"};
`;

export default function Button({children, ...props}) {
    return (
        <ButtonStyled {...props}>{children}</ButtonStyled>
    )
}