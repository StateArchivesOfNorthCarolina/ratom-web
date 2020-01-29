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
`;

export default AccountsLayout;
