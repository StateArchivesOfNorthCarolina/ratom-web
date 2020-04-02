import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../styles/styleVariables';

// Context
import { AccountContext } from './MessagesMain';

// Router
import { useHistory } from 'react-router-dom';

// Components
import BackButton from '../../Components/Buttons/BackButton';
import AccountDetails from '../Accounts/AccountsList/AccountDetails';
import Spinner from '../../Components/Loading/Spinner';

const MessagesHeader = () => {
  const { account } = useContext(AccountContext);
  const history = useHistory();

  return (
    <MessagesHeaderStyled>
      <ButtonWrapper>
        <BackButton onClick={() => history.push('/')} />
      </ButtonWrapper>
      <ContentWrapper>
        {account ? <AccountDetails account={account} asHeader /> : <Spinner />}
      </ContentWrapper>
    </MessagesHeaderStyled>
  );
};

const MessagesHeaderStyled = styled.header`
  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 26rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 1rem;
`;

export default MessagesHeader;
