import React from 'react';
import styled from 'styled-components';

import posed, { PoseGroup } from 'react-pose';

const AnimatedModal = ({ isVisible, closeModal, children, ...props }) => {
  return (
    <PoseGroup {...props}>
      {isVisible && [
        <StyledShade onClick={closeModal} key="shade" />,
        <StyledModal key="modal">{children}</StyledModal>
      ]}
    </PoseGroup>
  );
};

const Modal = posed.div({
  enter: {
    opacity: 1,
    delay: 100,
    transition: {
      default: { duration: 200 }
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 100 }
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
  background-color: ${props => props.theme.primaryBackground};
`;

export default AnimatedModal;
