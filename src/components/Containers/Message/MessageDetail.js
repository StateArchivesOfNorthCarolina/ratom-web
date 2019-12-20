import React, { useEffect } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';

// Router
import { useParams } from 'react-router-dom';

// AJAX
import { useQuery } from '@apollo/react-hooks';
import { GET_MESSAGE } from '../../../graphql/queries/messageQueries';
import Spinner from '../../Components/Loading/Spinner';

const MessageDetail = () => {
  const { messageId } = useParams();
  const { loading, error, data } = useQuery(GET_MESSAGE, {
    variables: { pk: messageId }
  });

  return (
    <MessageDetailStyled>
      {loading && <Spinner />}
      {error && error}
      {data && data.message && (
        <div>
          <h3>{data.message.msgSubject}</h3>
          <p>{data.message.msgTo}</p>
          <p>{data.message.msgFrom}</p>
          <p>{data.message.msgBody}</p>
        </div>
      )}
    </MessageDetailStyled>
  );
};

const MessageDetailStyled = styled.div`
  width: 100%;
  flex: 1;
  padding: 2rem;
  border-bottom: ${borderSeparator};
`;

export default MessageDetail;
