import React from 'react';
import styled from 'styled-components';
import {
  colorGrey,
  colorCaution,
  colorWhite,
  boxShadow,
  colorBlack,
  colorHover
} from '../../../styles/styleVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownMenu = ({ actions, setOpen, ...props }) => {
  const handleClick = (e, onClick) => {
    e.stopPropagation();
    setOpen(false);
    onClick();
  };

  return (
    <DropdownMenuStyled {...props} data-cy="dropdown-menu">
      {actions && actions.normal && (
        <NormalActions>
          {actions.normal.map(action => (
            <ActionItem
              data-cy="dropdown_action_item"
              key={action.display}
              onClick={e => handleClick(e, action.onClick)}
            >
              <ActionItemText>{action.display}</ActionItemText>
              {action.icon && <ActionItemIcon icon={action.icon} onClick={action.onIconClick} />}
            </ActionItem>
          ))}
        </NormalActions>
      )}
      {actions && actions.caution && (
        <CautionActions cautionOnly={actions.normal.length === 0}>
          {actions.caution.map(action => (
            <ActionItem
              data-cy="dropdown_action_item"
              key={action.display}
              onClick={e => handleClick(e, action.onClick)}
            >
              <ActionItemText>{action.display}</ActionItemText>
              {action.icon && <ActionItemIcon icon={action.icon} onClick={action.onIconClick} />}
            </ActionItem>
          ))}
        </CautionActions>
      )}
    </DropdownMenuStyled>
  );
};

const DropdownMenuStyled = styled.div`
  height: ${props => (props.open ? 'auto' : 0)};
  opacity: ${props => (props.open ? 1 : 0)};
  display: flex;
  flex-direction: column;

  transition: all 0.15s linear;

  min-width: 32rem;

  border-radius: 10px;
  background-color: ${colorWhite};
  box-shadow: ${boxShadow};

  & p {
    margin: 1rem 0;
    white-space: nowrap;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    color: ${colorBlack};
  }
`;

const NormalActions = styled.div``;

const CautionActions = styled.div`
  border-top: ${props => (props.cautionOnly ? 'none' : `1px solid ${colorGrey}`)};

  div p,
  svg {
    color: ${colorCaution};
  }
`;

const ActionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colorHover};
  }
`;

const ActionItemText = styled.p``;

const ActionItemIcon = styled(FontAwesomeIcon)`
  margin-right: 1.5rem;
`;

export default DropdownMenu;
