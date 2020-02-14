import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Hooks
import usePortal from '../Hooks/usePortal';

const ClickableOverlay = ({ open, onClick }) => {
  const portalTarget = usePortal('portal-root');
  return ReactDOM.createPortal(
    <ClickableOverlayStyled open={open} onClick={onClick} />,
    portalTarget
  );
};

const ClickableOverlayStyled = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  z-index: 9;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default ClickableOverlay;
