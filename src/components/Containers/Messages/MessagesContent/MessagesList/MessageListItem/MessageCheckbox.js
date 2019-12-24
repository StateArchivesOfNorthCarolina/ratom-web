import React from 'react';
import styled from 'styled-components';
import { borderRadius } from '../../../../../../styles/styleVariables';

const MessageCheckbox = props => {
  return (
    <MessageCheckboxStyled type="checkbox">
      <input type="checkbox" {...props} />
      <span></span>
    </MessageCheckboxStyled>
  );
};

const MessageCheckboxStyled = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      /* background-color: #2196f3; */
      border-color: ${props => props.theme.colorPrimary};
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 2rem;
    width: 2rem;
    background-color: ${props => props.theme.primaryBackground};
    border: 3px solid ${props => props.theme.secondaryBackground};
    border-radius: ${borderRadius};

    &:after {
      content: '';
      position: absolute;
      display: none;
    }

    &:after {
      left: 4px;
      top: 0px;
      width: 6px;
      height: 12px;
      border: solid ${props => props.theme.colorPrimary};
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }

  /* &:hover input ~ span {
    background-color: #ccc;
  } */
`;

export default MessageCheckbox;
