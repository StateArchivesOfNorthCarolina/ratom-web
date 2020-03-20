import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius } from '../../../styles/styleVariables';
import { darken } from '../../../styles/styleUtils/lighten-darken';

const ButtonStyled = styled.button`
  padding: 1rem 2rem;
  font-weight: bold;
  border-radius: ${borderRadius};
  background-color: white;

  opacity: ${props => (props.disabled ? 0.6 : 1)};
  font-size: ${props => (props.small ? '1rem' : '1.6rem')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  display: ${props => (props.block ? 'block' : 'inline-block')};
  background-color: ${props => {
    if (props.positive) {
      if (props.disabled) return props.theme.colorGrey;
      return props.theme.colorPrimary;
    }

    if (props.neutral) {
      return props.theme.backgroundPrimary;
    }

    if (props.negative) {
      if (props.disabled) return props.theme.colorGrey;
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

  ${props => {
    if (props.neutral) {
      return css`
        border: 2px solid ${props.theme.colorPrimary};
      `;
    }

    if (props.positive) {
      return css`
        border: 2px solid ${props.theme.colorPrimary};
      `;
    }

    if (props.negative) {
      return css`
        border: 2px solid ${props.theme.colorCaution};
      `;
    }

    return css`
      border: 2px solid ${props.theme.colorPrimary};
    `;
  }}

  &:hover {
    ${props => {
      if (props.disabled) return '';
      if (props.positive) {
        return css`
          background-color: darken(props.theme.colorPrimary);
          border-color: darken(props.theme.colorPrimary);
          transform: translateY(-1px);
        `;
      }

      if (props.neutral) {
        return css`
          border-color: darken(props.theme.colorPrimary);
          color: darken(props.theme.colorPrimary);
          transform: translateY(-1px);
        `;
      }

      if (props.negative) {
        return css`
          background-color: darken(props.theme.colorCaution);
          border-color: darken(props.theme.colorCaution);
          transform: translateY(-1px);
        `;
      }
    }}
  }

  &:active {
    ${props => {
      if (props.disabled) return '';
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
