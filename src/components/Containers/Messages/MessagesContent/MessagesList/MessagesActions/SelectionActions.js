import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Util
import formatNumber from '../../../../../../util/formatNumber';

// Context
import { MessagesContext } from '../../MessagesContent';
import { AccountContext } from '../../../MessagesMain';

// Children
import MessageCheckbox from '../MessageListItem/MessageCheckbox';
import RecordStatusWidget from '../../../../../Components/Widgets/RecordStatusWidget';
import ConfirmActionModal from './ConfirmActionModal';

const SelectionActions = () => {
  const { checkedMessages, checkAllMessages } = useContext(MessagesContext);
  const { messages } = useContext(AccountContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [targetStatus, setTargetStatus] = useState();

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

  const handleBulkRecordStatusChange = status => {
    setTargetStatus(status);
    setShowConfirmationModal(true);
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
        isVisible={showConfirmationModal}
        closeModal={() => setShowConfirmationModal(false)}
        messagesCount={checkedMessages.length}
        targetStatus={targetStatus}
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

export default SelectionActions;
