import React from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../styles/styleVariables';
import ActionButton from '../../Components/Buttons/ActionButton';

const CollectionsHeader = ({ openImportModal }) => {
  return (
    <CollectionsHeaderStyled>
      <h2>My Collections</h2>
      <ActionButton onClick={openImportModal}>Import Account</ActionButton>
    </CollectionsHeaderStyled>
  );
};

const CollectionsHeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 9rem;
  width: 100%;
  padding: 1.2rem 1rem 1rem 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${borderSeparator};

  h2 {
    margin-left: 2rem;
  }

  button {
    margin-right: 2rem;
  }
`;

export default CollectionsHeader;
