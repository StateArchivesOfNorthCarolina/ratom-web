import React, { useState } from 'react';
import styled from 'styled-components';
import {
  colorBadgeBlue,
  colorBadgeGreen,
  colorBadgeRed,
  colorPrimary
} from '../../../styles/styleVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Children
import DropdownMenu from './DropdownMenu';
import ClickableOverlay from '../ClickableOverlay';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// TODO: Remove this default value vvvv
const RecordStatusWidget = ({ value = 'open_record', onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelectOption = option => {
    setOpen(false);
    if (option !== value) onChange(option);
  };

  const buildActions = () => {
    return {
      normal: [
        {
          display: 'Open Record',
          onClick: () => handleSelectOption('open_record')
        },
        {
          display: 'Redacted',
          onClick: () => handleSelectOption('redacted')
        },
        {
          display: 'Restricted',
          onClick: () => handleSelectOption('restricted')
        }
      ],
      caution: [
        {
          display: 'Non-record',
          onClick: () => handleSelectOption('non-record')
        }
      ]
    };
  };

  const mapValueToDisplayValue = () => {
    const mapping = {
      open_record: 'Open record',
      'non-record': 'Non-record',
      redacted: 'Redacted',
      restricted: 'Restricted'
    };
    return mapping[value];
  };

  const getColorFromValue = () => {
    switch (value) {
      case 'open_record':
        return colorBadgeGreen;
      case 'non-record':
        return colorBadgeBlue;
      case 'redacted':
        return colorBadgeRed;
      case 'restricted':
        return colorBadgeRed;
    }
  };

  return (
    <>
      <RecordStatusWidgetWrapper>
        <RecordStatusWidgetStyled color={getColorFromValue()} onClick={() => setOpen(true)}>
          <Status color={getColorFromValue()}>{mapValueToDisplayValue()}</Status>
          <Selection icon={faChevronDown} color={getColorFromValue()} />
        </RecordStatusWidgetStyled>
        {open && <Menu open={open} actions={buildActions()} />}
      </RecordStatusWidgetWrapper>
      <ClickableOverlay onClick={() => setOpen(false)} open={open} />
    </>
  );
};

const RecordStatusWidgetWrapper = styled.div`
  position: relative;
`;

const RecordStatusWidgetStyled = styled.div`
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  border-color: ${props => props.color};
  min-width: 20rem;
  height: 3.6rem;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Status = styled.div`
  color: ${props => props.color};
  font-size: 1.6rem;
  font-weight: normal;
  padding: 1rem;
`;

const Selection = styled(FontAwesomeIcon)`
  padding-right: 1rem;
  font-size: 2.5rem;
`;

const Menu = styled(DropdownMenu)`
  z-index: 10;
  position: absolute;
  top: 100%;
  right: 0;
`;
export default RecordStatusWidget;
