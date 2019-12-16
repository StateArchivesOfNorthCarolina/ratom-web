import React from "react";
import styled from "styled-components";
import MessageListItem from "./MessageListItem/MessageListItem";

// ! REMOVE
const MESSAGES = [
  {
    id: 1,
    subject: "oh hi"
  },
  {
    id: 2,
    subject: "Hamlet"
  },
  {
    id: 3,
    subject: 'pipeline'
  },
  {
    id: 4,
    subject: 'FREE DVDs'
  },
  {
    id: 5,
    subject: 'illegal stuff'
  }
];

const MessagesList = () => {
  return <MessagesListStyled>{MESSAGES.map(message => <MessageListItem key={message.id} message={message}/>)}</MessagesListStyled>;
};

const MessagesListStyled = styled.ul`
    width: 100%;
    padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
