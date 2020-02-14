import React from 'react';
import styled from 'styled-components';
import { colorPrimary, colorBlack } from '../../../styles/styleVariables';

const Radio = ({ name, options, selected, onChange, ...props }) => {
  return (
    <RadioWrapper {...props}>
      {options.map(option => (
        <Option key={option.accessor}>
          <OptionInput
            type="radio"
            id={option.accessor}
            name={name}
            value={option.accessor}
            checked={selected === option.accessor}
            onChange={onChange}
          />
          <OptionLabel htmlFor={option.accessor}>
            {option.name}
            {option.extra && <span data-cy="processed_status_count">({option.extra})</span>}
          </OptionLabel>
        </Option>
      ))}
    </RadioWrapper>
  );
};

const RadioWrapper = styled.div``;

const Option = styled.div`
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const OptionInput = styled.input`
  &:checked,
  &:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &:checked + label,
  &:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
  }
  &:checked + label:before,
  &:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  &:checked + label:before {
    border-color: ${colorPrimary};
  }

  &:checked + label:after,
  &:not(:checked) + label:after {
    content: '';
    width: 11px;
    height: 11px;
    background: ${colorPrimary};
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const OptionLabel = styled.label`
  display: flex;
  color: ${colorBlack};

  span {
    margin-left: 1rem;
    letter-spacing: 1px;
    font-size: 1rem;
  }
`;

export default Radio;
