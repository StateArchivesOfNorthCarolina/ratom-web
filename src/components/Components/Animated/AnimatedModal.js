import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { boxShadow } from '../../../styles/styleVariables';

const AnimatedModal = ({ isVisible, closeModal, children, ...props }) => {
  return (
    <AnimatePresence>
      {isVisible && [
        // <StyledShade
        //   key="shade"
        //   onClick={closeModal}
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0 }}
        //   positionTransition
        // />,
        <StyledModal
          {...props}
          key="modal"
          transition={{
            duration: 0.25,
            ease: 'linear'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1], scale: [0.9, 0.95, 1] }}
          exit={{ opacity: 0, scale: 0.9 }}
          positionTransition
        >
          {children}
        </StyledModal>
      ]}
    </AnimatePresence>
  );
};

// });

// const StyledShade = styled(motion.div)`
//   position: absolute;
//   background: rgba(0, 0, 0, 0.8);
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

const StyledModal = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 300px;
  background-color: ${props => props.theme.primaryBackground};
  box-shadow: ${boxShadow};
`;

export default AnimatedModal;
