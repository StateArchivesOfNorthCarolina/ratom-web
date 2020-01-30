import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Axios
import Axios from '../../../../services/axiosConfig';
import { LIST_ACCOUNTS } from '../../../../services/requests';

// Router
import { useHistory } from 'react-router-dom';

// Children
import AccountsListItem from './AccountsListItem';
import Spinner from '../../../Components/Loading/Spinner';

const AccountsList = props => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState();
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    setLoading(true);
    Axios.get(LIST_ACCOUNTS)
      .then(response => {
        setAccounts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const setAccount = account => {
    history.push(`/accounts/${account.id}`);
  };

  return (
    <AccountsListStyled>
      {loading ? (
        <Spinner flex large />
      ) : (
        accounts &&
        accounts.map(account => (
          <AccountsListItem key={account.id} account={account} setAccount={setAccount} />
        ))
      )}
    </AccountsListStyled>
  );
};

const AccountsListStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default AccountsList;
