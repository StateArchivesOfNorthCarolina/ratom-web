import React, { useState } from "react";
// import { CollectionContext } from "../Collection/CollectionMessages";
import { useApolloClient } from "@apollo/react-hooks";
import { getCustomMessagesQuery } from "../../graphql/queries";
import MessageCard from "./MessageCard";
import MessageSearch from "./MessageSearch";

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  const client = useApolloClient();
  const searchMessages = ({ searchBy, searchString }) => {
    console.log('query: ', { searchBy, searchString })
    const query = getCustomMessagesQuery(searchBy)
    client.query({
      query,
      variables: { searchString }
    }).then(({ data }) => {
      const { allMessages: { edges: messages } } = data; // has pageInfo
      setMessages(messages);
    })
  }

  function renderData() {
    if (messages.length > 0) {
      return messages.map(({ node: message }) => (
        <MessageCard key={message.id} message={message} />
      ));
    }
    return "No Data";
  }

  return (
    <div>
      <MessageSearch searchMessages={searchMessages} />
      {renderData()}
    </div>);
}
