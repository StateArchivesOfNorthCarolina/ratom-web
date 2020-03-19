import React, { useState } from 'react';
import styled from 'styled-components';
import {
  borderSeparator,
  colorGreyLight,
  colorPrimary
} from '../../../../../../styles/styleVariables';

// Children
import SelectionActions from './SelectionActions';
import AccountExportModal from '../../../AccountExportModal';
import Button from '../../../../../Components/Buttons/Button';

const MessagesActions = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  return (
    <>
      <MessagesActionsStyled>
        <SelectionActions />
        <Actions>
          <Button
            neutral
            onClick={() => setShowExportModal(true)}
            data-cy="export-as-records-request-button"
          >
            Export
          </Button>
        </Actions>
      </MessagesActionsStyled>
      <AccountExportModal
        isVisible={showExportModal}
        closeModal={() => setShowExportModal(false)}
      />
    </>
  );
};

const MessagesActionsStyled = styled.div`
  height: 7rem;
  width: 100%;
  padding: 2rem 6rem;
  border-bottom: ${borderSeparator};

  background-color: ${colorGreyLight};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Actions = styled.div`
  max-width: 25%;

  p {
    font-size: 1.5rem;
    cursor: pointer;
    color: ${colorPrimary};
  }
`;

export default MessagesActions;
