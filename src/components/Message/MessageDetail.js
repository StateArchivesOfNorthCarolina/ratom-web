import React, { useContext } from "react";
import AppContext from "../app-state";
import { SingleMessageQuery } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

const MessageDetail = props => {
  const { currentMessageId } = useContext(AppContext);

  const variables = {};
  if (currentMessageId) variables.currentMessageId = currentMessageId;
  const response = useQuery(SingleMessageQuery, {
    variables
  });

  const loading = response.loading;
  const data = response.data;

  console.log(response);
  function renderData() {
    if (!loading && data) {
      const { message } = data;
      return (
        <div>
          <div>{message.msgFrom}</div>
          <div>{message.msgBody}</div>
        </div>
      );
    } else if (loading) {
      return <h1>Loading</h1>;
    }
    return "No Data";
  }
  return <div>{renderData()}</div>;
};

export default MessageDetail;
