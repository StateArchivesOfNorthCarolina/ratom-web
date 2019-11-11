import React from "react";
import styled from "styled-components";

const MessageCardStyled = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  width: 80%;
  height: 125px;

  margin-bottom: 1rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: flex-start;

  p {
      color: white;
      max-width: 650px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      span {
        color: ${props => props.theme.secondaryTextWhite}
      }
  }
`;

export default function MessageCard({ message, handleCardClick, ...props }) {
  return (
    <MessageCardStyled {...props} onClick={() => handleCardClick(message.id)}>
      <p><span>To:</span> {message.msgTo}</p>
      <p><span>From:</span> {message.msgFrom}</p>
      <p><span>Subject:</span> {message.msgSubject}</p>
      <p><span>Date:</span> {message.sentDate}</p>
    </MessageCardStyled>
  );
}
