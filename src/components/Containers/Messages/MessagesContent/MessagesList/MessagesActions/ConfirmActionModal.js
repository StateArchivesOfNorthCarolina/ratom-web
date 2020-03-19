import React, { useState } from 'react';
import styled from 'styled-components';
import { boxShadow } from '../../../../../../styles/styleVariables';

// Deps
import { motion, AnimatePresence } from 'framer-motion';

// Components
import AnimatedModal from '../../../../../Components/Animated/AnimatedModal';
import Spinner from '../../../../../Components/Loading/Spinner';
import Button from '../../../../../Components/Buttons/Button';

const ConfirmActionModal = ({
  Warning,
  Message,
  confirmationState,
  confirmationText,
  isVisible,
  closeModal,
  onActionConfirmed
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmAction = () => {
    setLoading(true);
    onActionConfirmed(() => setLoading(false));
  };

  return (
    <ConfirmActionModalStyled isVisible={isVisible} closeModal={closeModal}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {loading ? (
          <LoadingContent
            key="loadingContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'linear'
            }}
          >
            <h4>Processesing...</h4>
            <Spinner large immediate />
          </LoadingContent>
        ) : (
          <ConfirmationContent
            key="confirmationContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'linear'
            }}
          >
            {Warning && <Warning />}
            <WarningMessage>{Message && <Message />}</WarningMessage>
            <WarningActions>
              <Button neutral onClick={closeModal}>
                Cancel
              </Button>
              <Button
                positive={confirmationState === 'positive'}
                negative={confirmationState === 'negative'}
                data-cy="export-button"
                onClick={handleConfirmAction}
              >
                {confirmationText}
              </Button>
            </WarningActions>
          </ConfirmationContent>
        )}
      </AnimatePresence>
    </ConfirmActionModalStyled>
  );
};

const ConfirmActionModalStyled = styled(AnimatedModal)`
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: auto;
  box-shadow: ${boxShadow};
`;

const LoadingContent = styled(motion.div)`
  height: auto;
  width: auto;
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmationContent = styled(motion.div)`
  height: auto;
  width: auto;
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WarningMessage = styled.div`
  margin-bottom: 4rem;
`;

const WarningActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button:not(:first-child) {
    margin-left: 4rem;
  }
`;

export default ConfirmActionModal;
