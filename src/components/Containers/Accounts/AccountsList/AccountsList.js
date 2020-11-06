import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LIST_ITEM_VARIANTS, LIST_VARIANTS } from '../../../Components/Animated/animationConstants';

// Router
import { useHistory } from 'react-router-dom';

// Children
import AccountsListItem from './AccountsListItem';
import Spinner from '../../../Components/Loading/Spinner';
import ScrollShadow from '../../../Components/ScrollShadow';

const AccountsList = ({ accounts, loadingAccounts, setAccountModified }) => {
  const history = useHistory();

  const setAccount = account => {
    history.push(`/accounts/${account.id}`, { reset: true });
  };

  return (
    <AccountsListStyled initial="initial" animate="enter" exit="exit" variants={LIST_VARIANTS}>
      <ScrollShadow position="top" innerWidth="100%" />
      {loadingAccounts && <SpinnerStyled flex large />}
      {accounts?.length === 0 && <h2>No accounts</h2>}
      {accounts?.map(account => (
        <AccountsListItem
          key={account.id}
          account={account}
          setAccount={setAccount}
          variants={LIST_ITEM_VARIANTS}
          modifications={setAccountModified}
        />
      ))}
      <ScrollShadow position="bottom" innerWidth="100%" />
    </AccountsListStyled>
  );
};

const AccountsListStyled = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  position: relative;
`;

const SpinnerStyled = styled(Spinner)`
  margin-top: 5rem;
`;

export default AccountsList;
