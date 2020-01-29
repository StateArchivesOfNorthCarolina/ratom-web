import React from 'react';
import styled from 'styled-components';

const ClickableOverlay = ({ open, onClick }) => (
  <ClickableOverlayStyled open={open} onClick={onClick} />
);

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
