import React from "react";
import styled from "styled-components";
import { standardPadding } from "../../../styles/styleVariables";

const Pagination = () => {
  return (
    <PaginationStyled>
      <h4>Pagination</h4>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
    height: 8rem;
    width: 100%;
    padding: ${standardPadding};
    
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default Pagination;
