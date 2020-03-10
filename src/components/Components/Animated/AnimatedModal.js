import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { boxShadow } from '../../../styles/styleVariables';
import usePortal from '../../Hooks/usePortal';

const AnimatedModal = ({ isVisible, closeModal, children, ...props }) => {
  const portalTarget = usePortal('portal-root');
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isVisible && [
        <StyledShade
          key="shade"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          positionTransition
        />,
        <StyledModal
          {...props}
          key="modal"
          transition={{
            duration: 0.25,
            ease: 'linear'
          }}
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          animate={{ opacity: [0, 1, 1], scale: [0.9, 0.95, 1], x: '-50%', y: '-50%' }}
          exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
          positionTransition
        >
          {children}
        </StyledModal>
      ]}
    </AnimatePresence>,
    portalTarget
  );
};

const StyledShade = styled(motion.div)`
  z-index: 999;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledModal = styled(motion.div)`
  position: absolute;
  z-index: 1000;
  width: 500px;
  height: 300px;
  background-color: ${props => props.theme.primaryBackground};
  box-shadow: ${boxShadow};
`;

export default AnimatedModal;
