import React from "react";
import styled from "styled-components";
import { borderSeparator } from "../../../styles/styleVariables";

const MessageDetail = () => {
  return (
    <MessageDetailStyled>
      <h4>All the message content tho</h4>
    </MessageDetailStyled>
  );
};

const MessageDetailStyled = styled.div`
  width: 100%;
  flex: 1;
  padding: 2rem;
  border-bottom: ${borderSeparator};
`;

export default MessageDetail;
