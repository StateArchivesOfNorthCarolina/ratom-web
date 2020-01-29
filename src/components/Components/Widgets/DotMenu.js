import React, { useState } from 'react';
import styled from 'styled-components';

// Style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { boxShadow, colorWhite, colorPrimary } from '../../../styles/styleVariables';
import DropdownMenu from './DropdownMenu';
import ClickableOverlay from '../ClickableOverlay';

const DotMenu = ({ actions, hidden, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DotMenuWrapper {...props}>
        <DotMenuStyled onClick={() => setOpen(!open)} open={open}>
          <IconStyled icon={faEllipsisH} open={open} />
        </DotMenuStyled>
        <Menu open={open} actions={actions} />
      </DotMenuWrapper>
      <ClickableOverlay onClick={() => setOpen(false)} open={open} />
    </>
  );
};

const DotMenuWrapper = styled.div`
  position: relative;
`;

const DotMenuStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${props => (props.open ? colorPrimary : colorWhite)};
  cursor: pointer;
`;

const IconStyled = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: ${props => (props.open ? colorWhite : colorPrimary)};
`;

const Menu = styled(DropdownMenu)`
  z-index: 10;
  position: absolute;
  top: 100%;
  right: 0;
`;

export default DotMenu;
