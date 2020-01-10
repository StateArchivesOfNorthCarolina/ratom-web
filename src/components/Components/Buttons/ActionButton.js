import React from 'react';
import styled from 'styled-components';

const ActionButton = ({ children, ...props }) => {
  return <ActionButtonStyled {...props}>{children}</ActionButtonStyled>;
};

const ActionButtonStyled = styled.button`
  min-width: 20rem;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.colorPrimary};
  cursor: pointer;

  padding: 1rem;

  font-size: 1.6rem;
  font-weight: bold;
  color: ${props => props.theme.colorPrimary};
`;

export default ActionButton;
