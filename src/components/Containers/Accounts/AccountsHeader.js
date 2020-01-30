import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';

// Children
import ActionButton from '../../Components/Buttons/ActionButton';

const AccountsHeader = ({ openImportModal }) => {
  return (
    <AccountsHeaderStyled>
      <h2>My Accounts</h2>
      <ActionButton onClick={openImportModal}>New Account</ActionButton>
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
  justify-content: space-between;
  border-bottom: ${borderSeparator};

  h2 {
    margin-left: 2rem;
  }

  button {
    margin-right: 2rem;
  }
`;

export default AccountsHeader;
