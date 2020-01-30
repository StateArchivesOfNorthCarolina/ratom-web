import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';
import ActionButton from '../../Components/Buttons/ActionButton';

const AccountsHeader = props => {
  return (
    <AccountsHeaderStyled>
      <h2>My Accounts</h2>
    </AccountsHeaderStyled>
  );
};

const AccountsHeaderStyled = styled.header`
  height: 9rem;
  width: 100%;
  padding: 1.2rem 1rem 1rem 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${borderSeparator};

  h2 {
    margin-left: 2rem;
  }

  button {
    margin-right: 2rem;
  }
`;

export default AccountsHeader;
