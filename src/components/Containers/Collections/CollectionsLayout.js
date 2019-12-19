import React from "react";
import styled from "styled-components";

// Children
import CollectionsHeader from "./CollectionsHeader";

const CollectionsLayout = () => {
  return (
    <CollectionsLayoutStyled>
      <CollectionsHeader />
      <p>manually navigation to "/collections/1" to view more</p>
    </CollectionsLayoutStyled>
  );
};

const CollectionsLayoutStyled = styled.div`
  width: 100%;
`;

export default CollectionsLayout;
