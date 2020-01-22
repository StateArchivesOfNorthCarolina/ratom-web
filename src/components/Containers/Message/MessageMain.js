import React, { createContext } from 'react';
import styled from 'styled-components';

// Router
import { useParams } from 'react-router-dom';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';
import Spinner from '../../Components/Loading/Spinner';
import useAxios from '../../Hooks/useAxios';
import { SHOW_MESSAGE } from '../../../services/requests';

export const MessageContext = createContext();

const MessageMain = () => {
  const { messageId } = useParams();
  const [{ loading, data }] = useAxios(SHOW_MESSAGE + `${messageId}/`);

  const messageContext = {
    message: data || {}
  };

  return (
    <MessageContext.Provider value={messageContext}>
      <MessageMainStyled>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <MessageHeader />
            <MessageDetail />
            <MessageFooter />
          </>
        )}
      </MessageMainStyled>
    </MessageContext.Provider>
  );
};

const MessageMainStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MessageMain;
