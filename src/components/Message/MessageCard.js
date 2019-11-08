import React from "react";
import styled from "styled-components";

const MessageCardStyled = styled.div`
  border: 1px solid white;
  width: 80%;
  height: 100px;
`;

export default function MessageCard({ message, handleCardClick }) {
  return (
    <MessageCardStyled onClick={() => handleCardClick(message.id)}>
      <div>To: {message.msgTo}</div>
      <div>From: {message.msgFrom}</div>
      <div>Subject: {message.msgSubject}</div>
      <div>Date: {message.sentDate}</div>
    </MessageCardStyled>
  );
}
