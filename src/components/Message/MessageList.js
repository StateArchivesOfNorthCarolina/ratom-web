import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AllMessagesQuery } from "../../graphql/queries";
import MessageCard from "./MessageCard";
import { useHistory } from "react-router-dom";
import AppContext from "../app-state";

export default function MessageList(props) {
  const { currentCollection, setCurrentMessageId } = useContext(AppContext);
  let history = useHistory();

  const handleCardClick = messageId => {
    setCurrentMessageId(messageId);
    history.push(`/collection/${currentCollection.id}/message/${messageId}`);
  };

  const { loading, data } = useQuery(AllMessagesQuery);
  function renderData() {
    if (data) {
      const {
        allMessages: { edges }
      } = data;
      return edges.map(({ node: message }) => (
        <MessageCard
          key={message.id}
          message={message}
          handleCardClick={handleCardClick}
        />
      ));
    } else if (loading) {
      return <h1>Loading</h1>;
    }
    return "No Data";
  }
  return <div>{renderData()}</div>;
}
