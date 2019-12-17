import React from 'react';
import styled from 'styled-components';

import posed, { PoseGroup } from 'react-pose';

const AnimatedModal = ({ isVisible, toggleVisibility, children, ...props }) => {
  return (
    <PoseGroup {...props}>
      {isVisible && [
        <StyledShade onClick={toggleVisibility} key="shade" />,
        <StyledModal key="modal">
          {children}
        </StyledModal>
      ]}
    </PoseGroup>
  )
}

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 30 },
      default: { duration: 200 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const StyledShade = styled(Shade)`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  width: 500px;
  height: 300px;
  background: white;
  border-radius: 10px;
`;

export default AnimatedModal;
