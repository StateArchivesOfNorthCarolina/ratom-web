import React, { useContext } from "react";
import AppContext from "../app-state";
import { SingleMessageQuery } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const MessageDetail = props => {
  const {
    currentMessageId,
    currentCollection,
    setCurrentMessageId
  } = useContext(AppContext);

  const variables = {};
  if (currentMessageId) variables.currentMessageId = currentMessageId;
  const response = useQuery(SingleMessageQuery, {
    variables
  });

  const loading = response.loading;
  const data = response.data;
  let history = useHistory();

  const handleReturn = () => {
    setCurrentMessageId(null);
    history.push(`/collection/${currentCollection.id}`);
  };

  console.log(response);
  function renderData() {
    if (!loading && data) {
      const { message } = data;
      return (
        <>
          <div style={{ float: "left" }}>
            <div>
              <button onClick={handleReturn}>Take me back</button>
            </div>
            <form>
              <label>
                From:
                <input
                  size="100"
                  type="text"
                  disabled
                  value={message.msgFrom}
                />
              </label>
              <br />
              <label>
                To:
                <input size="100" type="text" disabled value={message.msgTo} />
              </label>
              <br />
              <label>
                Date Sent:
                <input
                  size="100"
                  type="text"
                  disabled
                  value={message.sentDate}
                />
              </label>
              <br />
              <label>
                Body:
                <textarea
                  rows="30"
                  cols="100"
                  type="text"
                  disabled
                  value={message.msgBody}
                />
              </label>
            </form>
          </div>
        </>
      );
    } else if (loading) {
      return <h1>Loading</h1>;
    }
    return "No Data";
  }
  return <div>{renderData()}</div>;
};

export default MessageDetail;
