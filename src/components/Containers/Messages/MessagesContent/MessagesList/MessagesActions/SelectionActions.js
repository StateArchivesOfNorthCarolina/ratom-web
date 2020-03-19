import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { colorPrimary, colorBlackLight } from '../../../../../../styles/styleVariables';
import { motion, AnimatePresence } from 'framer-motion';

// Deps
import { useAlert } from 'react-alert';

// Util
import { isEmpty } from '../../../../../../util/isEmpty';
import formatNumber from '../../../../../../util/formatNumber';

// Axios
import Axios from '../../../../../../services/axiosConfig';
import { BATCH_UPDATE_MESSAGES } from '../../../../../../services/requests';

// Context
import { MessagesContext } from '../../MessagesContent';
import { AccountContext } from '../../../MessagesMain';

// Children
import MessageCheckbox from '../MessageListItem/MessageCheckbox';
import RecordStatusWidget from '../../../../../Components/Widgets/RecordStatusWidget';
import ConfirmActionModal from './ConfirmActionModal';

const SelectionActions = () => {
  const alert = useAlert();
  const { checkedMessages, checkAllMessages } = useContext(MessagesContext);
  const { messages, searchMessages } = useContext(AccountContext);
  const [confirmationModalDetails, setConfirmationModalDetails] = useState({});
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [targetStatus, setTargetStatus] = useState();
  const [targetAction, setTargetAction] = useState();

  useEffect(() => {
    if (checkedMessages.length === messages.length) {
      setChecked(true);
    } else if (checkedMessages.length > 0) {
      setIndeterminate(true);
    } else {
      setChecked(false);
      setIndeterminate(false);
    }
  }, [checkedMessages]);

  const handleCheckedChange = e => {
    if (e.target.checked && !checked && !indeterminate) {
      checkAllMessages(true);
      setIndeterminate(false);
    } else {
      checkAllMessages(false);
      setIndeterminate(false);
    }
  };

  const parseTargetStatus = status => {
    return status.replace('_', ' ');
  };

  const handleBulkRecordStatusChange = status => {
    setTargetAction('record_status');
    setTargetStatus(status);
    const parsedStatus = parseTargetStatus(status);
    setConfirmationModalDetails({
      Warning: () => (
        <Warning>
          Change status of <span>{checkedMessages.length}</span> messages
        </Warning>
      ),
      Message: () => (
        <WarningMessage>
          Set status to
          <span> {parsedStatus}</span>?
        </WarningMessage>
      ),
      confirmationState:
        status === 'open_record' || status === 'non-record' ? 'positive' : 'negative',
      confirmationText: `Mark as ${parsedStatus}`
    });
  };

  const handleActionConfirmed = callback => {
    const data = {
      messages: checkedMessages,
      action: targetAction,
      effect: targetStatus
    };
    let successMessage = 'Success';
    if (targetAction === 'record_status') {
      successMessage = `Update record status of ${
        checkedMessages.length
      } messages to ${parseTargetStatus(targetStatus)}`;
    }
    Axios.put(BATCH_UPDATE_MESSAGES, data, { timeout: 10000 })
      .then(() => {
        searchMessages();
        callback();
        setConfirmationModalDetails({});
        alert.success(successMessage);
      })
      .catch(error => {
        callback();
        alert.error('Failed to update messages');
        console.warn('Error while bulk updating messages: ', error);
      });
  };

  return (
    <>
      <SelectionActionsStyled>
        <InnerWrapper>
          <SelectionWrap>
            <MessageCheckbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleCheckedChange}
            />
            <h3>
              <span>{formatNumber(checkedMessages.length)}</span> selected
            </h3>
          </SelectionWrap>
          <AnimatePresence>
            {checkedMessages.length > 0 && (
              <SelectedActions
                transition={{
                  duration: 0.15,
                  ease: 'linear'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 1, 1], scale: [0.9, 0.95, 1] }}
                exit={{ opacity: 0, scale: 0.9 }}
                positionTransition
              >
                <RecordStatusWidget
                  handleBulkChange={handleBulkRecordStatusChange}
                  position="top"
                />
              </SelectedActions>
            )}
          </AnimatePresence>
        </InnerWrapper>
      </SelectionActionsStyled>
      <ConfirmActionModal
        {...confirmationModalDetails}
        isVisible={!isEmpty(confirmationModalDetails)}
        closeModal={() => setConfirmationModalDetails({})}
        onActionConfirmed={handleActionConfirmed}
      />
    </>
  );
};

const SelectionActionsStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 50%;
`;

const SelectionWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    span {
      display: inline-block;
      min-width: 1.5rem;
    }
  }
`;

const SelectedActions = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4rem;
`;

const Warning = styled.h2`
  span {
    color: ${colorPrimary};
  }
`;

const WarningMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${colorBlackLight};

  span {
    font-weight: bold;
  }
`;

export default SelectionActions;
