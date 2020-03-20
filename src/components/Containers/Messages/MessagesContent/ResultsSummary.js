import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding, colorPrimary } from '../../../../styles/styleVariables';

// Context
import { AccountContext } from '../MessagesMain';
import formatNumber from '../../../../util/formatNumber';

const ResultsSummary = () => {
  const { messages, messagesTotalCount } = useContext(AccountContext);

  return (
    <ResultsSummaryStyled>
      <Summary>
        <h3>
          Displaying <span>{formatNumber(messages.length)}</span> of
          {messagesTotalCount === 10000 ? ' more than ' : ' '}
          {formatNumber(messagesTotalCount)} results
        </h3>
      </Summary>
    </ResultsSummaryStyled>
  );
};

const ResultsSummaryStyled = styled.div`
  height: 6rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};
  padding: 0 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Summary = styled.div`
  flex: 1;
  h3 {
    span {
      color: ${colorPrimary};
    }
  }
`;

export default ResultsSummary;
