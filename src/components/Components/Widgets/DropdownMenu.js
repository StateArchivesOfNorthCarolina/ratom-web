import React from 'react';
import styled from 'styled-components';
import {
  colorGrey,
  colorCaution,
  colorWhite,
  boxShadow,
  colorBlack
} from '../../../styles/styleVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownMenu = ({ actions, ...props }) => {
  return (
    <DropdownMenuStyled {...props}>
      {actions && actions.normal && (
        <NormalActions>
          {actions.normal.map(action => (
            <ActionItem key={action.display}>
              <ActionItemText onClick={action.onClick}>{action.display}</ActionItemText>
              {action.icon && <ActionItemIcon icon={action.icon} onClick={action.onIconClick} />}
            </ActionItem>
          ))}
        </NormalActions>
      )}
      {actions && actions.caution && (
        <CautionActions>
          {actions.caution.map(action => (
            <ActionItem key={action.display}>
              <ActionItemText onClick={action.onClick}>{action.display}</ActionItemText>
              {action.icon && <ActionItemIcon icon={action.icon} onClick={action.onIconClick} />}
            </ActionItem>
          ))}
        </CautionActions>
      )}
    </DropdownMenuStyled>
  );
};

const DropdownMenuStyled = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  min-width: 32rem;

  border-radius: 10px;
  background-color: ${colorWhite};
  box-shadow: ${boxShadow};

  p {
    margin: 1rem 0;
    white-space: nowrap;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    color: ${colorBlack};
    cursor: pointer;
  }
`;

const NormalActions = styled.div``;

const CautionActions = styled.div`
  border-top: 1px solid ${colorGrey};

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
`;

const ActionItemText = styled.p``;

const ActionItemIcon = styled(FontAwesomeIcon)`
  margin-right: 1.5rem;
`;

export default DropdownMenu;
