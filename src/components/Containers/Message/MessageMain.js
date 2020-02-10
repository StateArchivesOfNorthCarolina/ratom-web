import React, { useState, createContext, useContext, useEffect } from 'react';
import styled from 'styled-components';

// Context
import { AccountContext } from '../Messages/MessagesMain';

// Axios
import Axios from '../../../services/axiosConfig';
import { SHOW_MESSAGE } from '../../../services/requests';

// Router
import { useParams } from 'react-router-dom';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';
import Spinner from '../../Components/Loading/Spinner';

export const MessageContext = createContext();

const MessageMain = () => {
  const { query } = useContext(AccountContext);
  const { messageId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  useEffect(() => {
    setLoading(true);
    const { keywords } = query;
    const url =
      keywords && keywords.length > 0
        ? `${SHOW_MESSAGE}${messageId}/?highlights=${keywords.join(',')}`
        : `${SHOW_MESSAGE}${messageId}/`;
    Axios.get(url)
      .then(response => {
        console.log(response);
        setMessage(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, [messageId]);

  const messageContext = {
    message
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
