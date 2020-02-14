import React, { useEffect, createContext, useState } from 'react';
import styled from 'styled-components';

// Axios
import Axios from '../../../services/axiosConfig';
import { SHOW_MESSAGE } from '../../../services/requests';

// Deps
import { useAlert } from 'react-alert';

// Router
import { useParams } from 'react-router-dom';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';
import Spinner from '../../Components/Loading/Spinner';

export const MessageContext = createContext();

const MessageMain = () => {
  const alert = useAlert();
  const { messageId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get(SHOW_MESSAGE + `${messageId}/`)
      .then(response => {
        setMessage(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.warn('Error: ', error && error.message);
        setLoading(false);
        alert.error('An error occured while fetching this message, please try again.');
      });
  }, []);

  const messageContext = { message };

  return (
    <MessageContext.Provider value={messageContext}>
      <MessageMainStyled>
        {loading || !message ? (
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
