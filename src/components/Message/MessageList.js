import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useApolloClient } from "@apollo/react-hooks";
import { getCustomMessagesQuery } from "../../graphql/queries";
import MessageCard from "./MessageCard";
import MessageSearch from "./MessageSearch";
import { useHistory } from "react-router-dom";
import AppContext from "../app-state";

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  const client = useApolloClient();
  const searchMessages = ({ searchBy, searchString }) => {
    const query = getCustomMessagesQuery(searchBy)
    client.query({
      query,
      variables: { searchString }
    }).then(({ data }) => {
      const { allMessages: { edges: messages } } = data; // has pageInfo
      setMessages(messages);
    })
  }

  const { currentCollection, setCurrentMessageId } = useContext(AppContext);
  let history = useHistory();

  const handleCardClick = messageId => {
    setCurrentMessageId(messageId);
    history.push(`/collection/${currentCollection.id}/message/${messageId}`);
  };

  function renderData() {
    if (messages.length > 0) {
      return messages.map(({ node: message }) => (
        <MessageCard key={message.id} message={message} handleCardClick={handleCardClick}/>
      ));
    }
    return null;
  }

  return (
    <div>
      <MessageSearch searchMessages={searchMessages} />
      <MessagesWrapper>
        {renderData()}
      </MessagesWrapper>
    </div>);
}
