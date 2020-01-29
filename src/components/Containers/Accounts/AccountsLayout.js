import React from 'react';
import styled from 'styled-components';

// Children
import AccountsHeader from './AccountsHeader';
import AccountsList from './AccountsList/AccountsList';

const AccountsLayout = () => {
  return (
    <AccountsLayoutStyled>
      <AccountsHeader />
      <AccountsList />
    </AccountsLayoutStyled>
  );
};

const AccountsLayoutStyled = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default AccountsLayout;
