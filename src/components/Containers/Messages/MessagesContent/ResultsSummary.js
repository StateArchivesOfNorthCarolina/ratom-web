import React from 'react';
import styled from 'styled-components';
import { borderSeparator, standardPadding } from '../../../../styles/styleVariables';

const ResultsSummary = () => {
    return (
        <ResultsSummaryStyled>
            <h4>Results Summary</h4>
        </ResultsSummaryStyled>
    )
}

const ResultsSummaryStyled = styled.div`
  height: 6rem;
  width: 100%;
  padding: ${standardPadding};
  border-bottom: ${borderSeparator};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default ResultsSummary;
