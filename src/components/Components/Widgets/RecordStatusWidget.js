import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  colorBadgeBlue,
  colorBadgeGreen,
  colorBadgeRed,
  colorGrey,
  colorBlackLight,
  colorPrimary
} from '../../../styles/styleVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Axios
import Axios from '../../../services/axiosConfig';

// Children
import DropdownMenu from './DropdownMenu';
import ClickableOverlay from '../ClickableOverlay';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { UPDATE_MESSAGE } from '../../../services/requests';

const RecordStatusWidget = ({
  messageId,
  audit,
  handleBulkChange,
  position,
  afterChange,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (audit) {
      const newStatus = mapAuditToOption(audit);
      setStatus(newStatus);
    }
  }, [audit]);

  const handleSelectOption = option => {
    setOpen(false);
    if (handleBulkChange) {
      handleBulkChange(option);
    } else if (option !== status) {
      setStatus(option);
      updateMessageStatus(option);
    }
  };

  const mapAuditToOption = aud => {
    if (aud.is_restricted) return 'restricted';
    if (aud.needs_redaction) return 'redacted';
    if (aud.is_record === false) return 'non-record';
    if (aud.is_record && aud.processed) return 'open_record';
  };

  const mapOptionToAudit = option => {
    const newAudit = {
      is_record: true,
      is_restricted: false,
      needs_redaction: false
    };
    if (option === 'non-record') newAudit.is_record = false;
    if (option === 'restricted') newAudit.is_restricted = true;
    if (option === 'redacted') newAudit.needs_redaction = true;
    return newAudit;
  };

  const updateMessageStatus = option => {
    const newAudit = mapOptionToAudit(option);
    Axios.put(`${UPDATE_MESSAGE}${messageId}/`, newAudit)
      .then(_response => {
        afterChange(true, option);
      })
      .catch(error => {
        console.warn(error.message);
        afterChange(false, option);
        setStatus(mapAuditToOption(audit));
      });
  };

  const buildActions = () => {
    return {
      normal: [
        {
          display: 'Open record',
          onClick: () => handleSelectOption('open_record')
        },
        {
          display: 'Needs redaction',
          onClick: () => handleSelectOption('redacted')
        },
        {
          display: 'Restricted',
          onClick: () => handleSelectOption('restricted')
        }
      ],
      caution: [
        {
          display: 'Mark as non-record',
          onClick: () => handleSelectOption('non-record')
        }
      ]
    };
  };

  const mapStatusToDisplayStatus = () => {
    if (!status) return 'Status';
    const mapping = {
      open_record: 'Open record',
      'non-record': 'Non-record',
      redacted: 'Needs redaction',
      restricted: 'Restricted'
    };
    return mapping[status];
  };

  const getColorFromStatus = () => {
    switch (status) {
      case 'open_record':
        return colorBadgeGreen;
      case 'non-record':
        return colorBadgeBlue;
      case 'redacted':
        return colorBadgeRed;
      case 'restricted':
        return colorBadgeRed;
      default:
        return colorGrey;
    }
  };

  const openMenu = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeMenu = e => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <RecordStatusWidgetWrapper {...props} data-cy="record_status_widget">
        <RecordStatusWidgetStyled color={getColorFromStatus()} onClick={openMenu}>
          <Status status={status} color={getColorFromStatus()}>
            {mapStatusToDisplayStatus()}
          </Status>
          <Selection status={status} icon={faChevronDown} color={getColorFromStatus()} />
        </RecordStatusWidgetStyled>
        {open && (
          <Menu open={open} position={position} setOpen={setOpen} actions={buildActions()} />
        )}
      </RecordStatusWidgetWrapper>
      <ClickableOverlay onClick={closeMenu} open={open} />
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
  color: ${props => (props.status ? props.color : colorBlackLight)};
  font-size: 1.6rem;
  font-weight: normal;
  padding: 1rem;
`;

const Selection = styled(FontAwesomeIcon)`
  color: ${props => (props.status ? props.color : colorPrimary)};
  padding-right: 1rem;
  font-size: 2.5rem;
`;

const Menu = styled(DropdownMenu)`
  z-index: 1000;
  position: absolute;
  ${props => {
    switch (props.position) {
      case 'top':
        return css`
          bottom: 100%;
          right: 0;
        `;
      case 'right':
        return css`
          bottom: 0;
          left: 100%;
        `;
      case 'bottom':
        return css`
          top: 100%;
          right: 0;
        `;
      case 'left':
        return css`
          bottom: 0;
          right: 100%;
        `;
      default:
        return css`
          top: 100%;
          right: 0;
        `;
    }
  }}
`;
export default RecordStatusWidget;
