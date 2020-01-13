import React, { createContext } from 'react';
import styled from 'styled-components';

// Router
import { useParams } from 'react-router-dom';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { GET_MESSAGE } from '../../../graphql/queries/messageQueries';

// Children
import MessageHeader from './MessageHeader';
import MessageDetail from './MessageDetail';
import MessageFooter from './MessageFooter';
import Spinner from '../../Components/Loading/Spinner';

export const MessageContext = createContext();

const MessageMain = () => {
  const { messageId } = useParams();
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { pk: messageId }
  });

  // on messageStep, history.push('/current-loc/newMessageCursor?)

  // !
  // ? set cursor in params instead of id?
  // ? Then we'd have to getSingleMessage by cursor. Is that possible?
  // ? If not, the following case may be difficult:
  // On messsages list, I'm showing only 12 of 22 records.
  // I view record 12.
  // I step right.
  // I can't just look for the id of index + 1.
  // !

  const messageContext = {
    message: (data && data.message) || {}
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
