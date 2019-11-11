import React, { useContext } from "react";
import styled from 'styled-components';
import AppContext from "../app-state";
import { SingleMessageQuery } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const StyledForm = styled.form`
  width: 85%;
  margin: 2rem 0;

  div {
    width: 100%;

    p {
      padding: 0 0 .5rem .5rem;
    }
  }

  div > *:not(p){
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const ButtonStyled = styled.div`
    border: 2px solid white;
    border-radius: 5px;
    padding: 1rem;
    font-size: 18px;
    &:active {
        background-color: steelblue;
    }
`

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
          <StyledWrapper>
            <StyledForm>
                <div>
                  <p>from:</p>
                  <input
                    size="100"
                    type="text"
                    disabled
                    value={message.msgFrom}
                  />
                </div>

                <div>
                  <p>to:</p>
                  <input size="100" type="text" disabled value={message.msgTo} />
                </div>

                <div>
                  <p>date sent:</p>
                  <input
                    size="100"
                    type="text"
                    disabled
                    value={message.sentDate}
                  />
                </div>

                <div>
                  <p>body:</p>
                  <textarea
                    rows="30"
                    cols="100"
                    type="text"
                    disabled
                    value={message.msgBody}
                  />
                </div>
            </StyledForm>
            <ButtonStyled onClick={handleReturn}>Take me back</ButtonStyled>
        </StyledWrapper>
      );
    } else if (loading) {
      return <h1>Loading</h1>;
    }
    return "No Data";
  }
  return <div>{renderData()}</div>;
};

export default MessageDetail;
