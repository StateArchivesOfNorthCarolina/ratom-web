import React from 'react';
import styled, { css } from 'styled-components';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestion,
  faSearch,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { lighten } from '../../../styles/styleUtils/lighten-darken';

const Input = ({ label, icon, onEnterKey, className, ...props }) => {
  let derivedIcon;
  switch (icon) {
    case 'search':
      derivedIcon = faSearch;
      break;
    case 'chevronLeft':
      derivedIcon = faChevronLeft;
      break;
    case 'chevronRight':
      derivedIcon = faChevronRight;
      break;
    case 'question':
      derivedIcon = faQuestion;
      break;
    default:
      derivedIcon = faQuestion;
      break;
  }

  const handleKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (onEnterKey) onEnterKey();
    }
  };

  return (
    <FieldSetStyled className={className}>
      <LabelStyled>{label}</LabelStyled>
      <div>
        <InputStyled {...props} type={props.type || 'text'} onKeyPress={handleKeyPressed} />
        {icon && <IconStyled icon={derivedIcon} />}
      </div>
    </FieldSetStyled>
  );
};

export default Input;

const FieldSetStyled = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
  }
`;

const LabelStyled = styled.label`
  margin-bottom: 1rem;
`;

const InputStyled = styled.input`
  width: 100%;
  /* height: 2.3rem; */
  padding: 1rem 2rem;
`;

const IconStyled = styled(FontAwesomeIcon)`
  position: relative;
  right: 4rem;
  top: 0.7rem;
  font-size: 2.5rem;
  color: ${props => props.theme.colorPrimary};
  cursor: pointer;

  ${props => {
    if (props.iconAsButton) {
      return css`
        &:hover {
          color: ${props => lighten(props.theme.colorPrimary)};
        }

        &:active {
          transform: translate(1px, 1px);
        }
      `;
    }
  }}

  transition: all 0.1s linear;
`;
