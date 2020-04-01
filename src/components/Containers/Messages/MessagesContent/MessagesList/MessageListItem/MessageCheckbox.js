import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { borderRadius } from '../../../../../../styles/styleVariables';

const MessageCheckbox = props => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.indeterminate = props.indeterminate;
  }, [props.indeterminate]);

  return (
    <MessageCheckboxStyled label={props.label}>
      <CheckboxStyled type="checkbox">
        <input type="checkbox" {...props} ref={inputRef} />
        <span className="checked" />
        <span className="indeterminate" />
        {props.label && <p>{props.label}</p>}
      </CheckboxStyled>
    </MessageCheckboxStyled>
  );
};

const MessageCheckboxStyled = styled.div`
  width: ${props => (props.label ? 'auto' : '2rem')};
  height: 2rem;
  margin-right: 1.5rem;
`;

const CheckboxStyled = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;

  p {
    line-height: 1.2;
    width: auto;
    padding-left: 2.5rem;
    font-size: 1.5rem;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span.checked {
      border-color: ${props => props.theme.colorPrimary};
      z-index: 1;
    }

    &:checked ~ span.checked:after {
      display: block;
    }

    &:indeterminate ~ span.indeterminate {
      border-color: ${props => props.theme.colorPrimary};
      z-index: 1;
    }

    &:indeterminate ~ span.indeterminate:after {
      display: block;
    }
  }

  span.checked {
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

  span.indeterminate {
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
      left: 50%;
      top: 50%;
      width: 7px;
      border-bottom: 3px solid ${props => props.theme.colorPrimary};
      transform: translate(-50%, -50%);
    }
  }

  &:hover input ~ span {
    border-color: ${props => props.theme.colorPrimary};
  }
`;

export default MessageCheckbox;
