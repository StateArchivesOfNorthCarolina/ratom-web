import React from "react";
import styled from "styled-components";
import {
  standardPadding,
  borderSeparator
} from "../../../styles/styleVariables";

const MessageFooter = () => {
  return (
    <MessageFooterStyled>
        <h4>Footer</h4>
    </MessageFooterStyled>
  );
};

const MessageFooterStyled = styled.header`
  height: 8.5rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MessageFooter;
