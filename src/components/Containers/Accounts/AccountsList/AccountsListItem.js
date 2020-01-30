import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import AccountDetails from './AccountDetails';

const AccountsListItem = ({ account, setAccount, ...props }) => {
  return (
    <AccountsListItemStyled data-cy="accounts_list_item" {...props}>
      <AccountDetails account={account} setAccount={setAccount} />
    </AccountsListItemStyled>
  );
};

const AccountsListItemStyled = styled(motion.div)`
  padding: 1.5rem;
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default AccountsListItem;
