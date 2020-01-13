import React from 'react';
import styled from 'styled-components';
import { borderRadius } from '../../../../../../styles/styleVariables';

const MessageCheckbox = props => {
  return (
    <MessageCheckboxStyled>
      <CheckboxStyled type="checkbox">
        <input type="checkbox" {...props} />
        <span></span>
      </CheckboxStyled>
    </MessageCheckboxStyled>
  );
};

const MessageCheckboxStyled = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 1.5rem;
`;

const CheckboxStyled = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
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
    height: 1.8rem;
    width: 1.8rem;
    background-color: ${props => props.theme.primaryBackground};
    border: 2px solid ${props => props.theme.colorGrey};
    border-radius: ${borderRadius};

    &:after {
      content: '';
      position: absolute;
      display: none;
    }

    &:after {
      left: 4px;
      top: 2px;
      width: 5px;
      height: 9px;
      border: solid ${props => props.theme.colorPrimary};
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:hover input ~ span {
    border-color: ${props => props.theme.colorPrimary};
  }
`;

export default MessageCheckbox;
