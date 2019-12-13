import React from "react";
import styled from "styled-components";
import MessageListItem from "./MessageListItem/MessageListItem";

// ! REMOVE
const MESSAGES = [1,2,3,4,5]

const MessagesList = () => {
  return <MessagesListStyled>{MESSAGES.map(i => <MessageListItem key={i}/>)}</MessagesListStyled>;
};

const MessagesListStyled = styled.ul`
    width: 100%;
    padding: 3rem 3rem 0 3rem;
`;

export default MessagesList;
