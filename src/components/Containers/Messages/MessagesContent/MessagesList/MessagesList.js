import React, { useContext } from 'react';
import styled from 'styled-components';

// Context
import { CollectionContext } from '../../MessagesMain';

// Children
import MessageListItem from './MessageListItem/MessageListItem';
import AnimatedList from '../../../../Components/Animated/AnimatedList';

// // ! REMOVE
// const MESSAGES = [
//   {
//     id: 1,
//     subject: 'oh hi'
//   },
//   {
//     id: 2,
//     subject: 'Hamlet'
//   },
//   {
//     id: 3,
//     subject: 'pipeline'
//   },
//   {
//     id: 4,
//     subject: 'FREE DVDs'
//   },
//   {
//     id: 5,
//     subject: 'illegal stuff'
//   }
// ];

const MessagesList = () => {
  const { messages } = useContext(CollectionContext);
  return (
    <MessagesListStyled>
      {messages.map(({ node: message }) => (
        <MessageListItem key={message.id} message={message} />
      ))}
    </MessagesListStyled>
  );
};

const MessagesListStyled = styled(AnimatedList)`
  width: 100%;
  padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
