import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius } from '../../../styles/styleVariables';
import { darken } from '../../../styles/styleUtils/lighten-darken';

const ButtonStyled = styled.button`
  padding: 1rem 2rem;
  font-weight: bold;
  border-radius: ${borderRadius};

  font-size: ${props => (props.small ? '1rem' : '1.5rem')};

  display: ${props => (props.block ? 'block' : 'inline-block')};
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

  border: ${props => (props.neutral ? `2px solid ${props.theme.colorPrimary}` : 'none')};

  &:hover {
    ${props => {
      if (props.positive) {
        return css`
          background-color: ${props => darken(props.theme.colorPrimary)};
          transform: translateY(-1px);
        `;
      }

      if (props.neutral) {
        return css`
          border-color: ${props => darken(props.theme.colorPrimary)};
          color: ${props => darken(props.theme.colorPrimary)};
          transform: translateY(-1px);
        `;
      }

      if (props.negative) {
        return css`
          background-color: ${props => darken(props.theme.colorCaution)};
          transform: translateY(-1px);
        `;
      }
    }}
  }

  &:active {
    ${props => {
      if (props.positive) {
        return css`
          background-color: ${props => darken(props.theme.colorPrimary)};
          transform: translateY(1px);
        `;
      }

      if (props.neutral) {
        return css`
          border-color: ${props => darken(props.theme.colorPrimary)};
          color: ${props => darken(props.theme.colorPrimary)};
          transform: translateY(1px);
        `;
      }

      if (props.negative) {
        return css`
          background-color: ${props => darken(props.theme.colorCaution)};
          transform: translateY(1px);
        `;
      }
    }}
  }

  transition: all 0.05s linear;
`;

export default function Button({ children, ...props }) {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
}
