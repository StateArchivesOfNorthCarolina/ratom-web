import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding, colorPrimary } from '../../../../styles/styleVariables';

// Context
import { AccountContext } from '../MessagesMain';
import formatNumber from '../../../../util/formatNumber';
import AccountExportModal from '../AccountExportModal';

const ResultsSummary = () => {
  const { messages, messagesTotalCount } = useContext(AccountContext);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <ResultsSummaryStyled>
        <Summary>
          <h3>
            Displaying <span>{formatNumber(messages.length)}</span> of
            {messagesTotalCount === 10000 ? ' more than ' : ' '}
            {formatNumber(messagesTotalCount)} results
          </h3>
        </Summary>
        <Actions>
          <p data-cy="export-as-records-request-button" onClick={() => setShowExportModal(true)}>
            Export as Records Request
          </p>
        </Actions>
      </ResultsSummaryStyled>
      <AccountExportModal
        isVisible={showExportModal}
        closeModal={() => setShowExportModal(false)}
      />
    </>
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

const Actions = styled.div`
  max-width: 25%;

  p {
    font-size: 1.5rem;
    cursor: pointer;
    color: ${colorPrimary};
  }
`;

export default ResultsSummary;
