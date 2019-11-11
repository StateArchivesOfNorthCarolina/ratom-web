import React, { useContext } from "react";
import AppContext from "../app-state";
import { format } from "date-fns";

import styled from 'styled-components';


const WrapperStyled = styled.div`
  margin: 3rem;

  h3, p {
    font-family: 'Roboto Mono', monospace;
    padding: 0;
    margin: 0;
    color: ${props => props.theme.secondaryTextWhite}
  }

  p {
    margin: 1rem;
  }

  h1 {
    margin: 0;
    padding-left: 1rem;
  }
`;

const CollectionDetail = () => {
  const { currentCollection } = useContext(AppContext);
  
  const renderAccessionDate = () => {
    if (currentCollection.accessionDate) {
      const [year, month, day] = currentCollection.accessionDate.split('-')
      const date = new Date(year, parseInt(month) - 1, day);
      return format(date, "cccc 'the' do 'of' MMMM',' y")
    }
    return null
  }

  return (
    <WrapperStyled>
      <h3>the</h3>
      <h1>{currentCollection.title}</h1>
      <h3>collection</h3>
      <p>accessioned {renderAccessionDate()}</p>
    </WrapperStyled>
  );
};

export default CollectionDetail;
