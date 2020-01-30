import React from 'react';
import styled from 'styled-components';
import {
  colorBadgeGreen,
  colorBadgeRed,
  colorBadgeBlue,
  colorWhite
} from '../../styles/styleVariables';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import CloseButton from './Buttons/CloseButton';

const Alert = ({ message, options, close, ...props }) => {
  return (
    <AlertStyled type={options.type} {...props}>
      <div>
        <IconStyled icon={faExclamationCircle} />
        <p>{message}</p>
      </div>
      <CloseButton small color={colorWhite} onClick={close} />
    </AlertStyled>
  );
};

const AlertStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 4rem;
  padding: 0 2rem;

  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return colorBadgeGreen;
      case 'error':
        return colorBadgeRed;
      case 'info':
        return colorBadgeBlue;
      default:
        break;
    }
  }};
  border-radius: 4px;
  height: 4rem;
  width: 95vw;
  color: ${colorWhite};

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
      color: ${colorWhite};
      font-family: Montserrat;
      font-size: 1.6rem;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.19;
      letter-spacing: normal;
    }
  }
`;

const IconStyled = styled(FontAwesomeIcon)`
  color: ${colorWhite};
  font-size: 2.3rem;
  margin-right: 2rem;
`;

export default Alert;
