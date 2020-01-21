import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';

// Axios
import { useLazyAxios } from '../../Hooks/useAxios';
import { showMessage } from '../../../services/requests';

// Router
import { useParams } from 'react-router-dom';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';
import Spinner from '../../Components/Loading/Spinner';

export const MessageContext = createContext();

const MessageMain = () => {
  const { messageId } = useParams();
  const [executeShowMessage] = useLazyAxios(showMessage, {});
  const [message, setMessage] = useState();

  useEffect(() => {
    executeShowMessage(messageId).then(message => {
      setMessage(message);
    });
  }, [messageId]);

  const messageContext = { message };
  return (
    <MessageContext.Provider value={messageContext}>
      <MessageMainStyled>
        {!message ? (
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
