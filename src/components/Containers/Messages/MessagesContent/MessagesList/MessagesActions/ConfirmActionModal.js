import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  boxShadow,
  colorPrimary,
  colorBlackLight,
  colorBadgeGreen,
  colorBadgeRed,
  colorBadgeBlue
} from '../../../../../../styles/styleVariables';

// Deps
import { motion, AnimatePresence } from 'framer-motion';

// Components
import AnimatedModal from '../../../../../Components/Animated/AnimatedModal';
import Spinner from '../../../../../Components/Loading/Spinner';
import Button from '../../../../../Components/Buttons/Button';

const ConfirmActionModal = ({ isVisible, closeModal, messagesCount, targetStatus, ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const parseTargetStatus = status => {
    return status && status.replace('_', ' ');
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
            <Warning>
              Change status of <span>{messagesCount}</span> messages
            </Warning>
            <WarningDetails>
              <p>
                Set status to
                <span> {parseTargetStatus(targetStatus)}</span>?
              </p>
            </WarningDetails>
            <WarningActions>
              <Button neutral onClick={closeModal}>
                Cancel
              </Button>
              <Button
                positive={targetStatus === 'open_record' || targetStatus === 'non-record'}
                negative={targetStatus === 'restricted' || targetStatus === 'redacted'}
                data-cy="export-button"
                onClick={handleConfirmAction}
              >
                Mark as {parseTargetStatus(targetStatus)}
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

const Warning = styled.h2`
  span {
    color: ${colorPrimary};
  }
`;

const WarningDetails = styled.div`
  margin-bottom: 4rem;
  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${colorBlackLight};

    span {
      font-weight: bold;
    }
  }
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
