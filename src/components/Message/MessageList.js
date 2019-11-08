import React from "react";
// import { CollectionContext } from "../Collection/CollectionMessages";
import { useQuery } from "@apollo/react-hooks";
import { AllMessagesQuery } from "../../graphql/queries";
import MessageCard from "./MessageCard";

export default function MessageList(props) {
  // const { currentCollection, setCurrentCollection, collections } = useContext(
  //   CollectionContext
  // );
  const { loading, data } = useQuery(AllMessagesQuery);
  function renderData() {
    if (data) {
      const {
        allMessages: { edges }
      } = data;
      return edges.map(({ node: message }) => (
        <MessageCard key={message.id} message={message} />
      ));
    } else if (loading) {
      return <h1>Loading</h1>;
    }
    return "No Data";
  }
  return <div>{renderData()}</div>;
}
