import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { colorBlackLight, colorBlack } from '../../../../styles/styleVariables';

// Util
import formatNumber from '../../../../util/formatNumber';
import dateToIso from '../../../../util/dateToIso';

// Children
import { StatusBadge } from '../../../Components/Labels/Badge';
import DotMenu from '../../../Components/Widgets/DotMenu';

export const STATUSES = {
  CR: 'Created',
  IM: 'Importing',
  CM: 'Complete',
  FA: 'Failed',
  RE: 'Restoring'
};

const IconTextStack = ({ item, ...props }) => {
  return (
    <IconTextStyled {...props}>
      <IconStyled {...props} />
      <span>{item}</span>
    </IconTextStyled>
  );
};

const AccountDetails = ({ account, asHeader, actions }) => {
  const [status, setStatus] = useState();
  const [shouldBeGrey, setShouldBeGrey] = useState(false);
  const { account_status: accountStatus } = account;

  useEffect(() => {
    setStatus(STATUSES[accountStatus]);
  }, [accountStatus]);

  useEffect(() => {
    setShouldBeGrey(asHeader || status === 'Importing' || status === 'Failed');
  }, [asHeader, status]);

  const getInclusiveDates = () => {
    const start = dateToIso(account.inclusive_dates[0]);
    const end = dateToIso(account.inclusive_dates[1]);
    return `${start} - ${end}`;
  };

  const getUnprocessedAmount = () => {
    const diff =
      parseInt(account.messages_in_account, 10) - parseInt(account.processed_messages, 10);
    return formatNumber(diff);
  };

  const getHiddenStatus = () => {
    if (status === STATUSES.IM || status === STATUSES.RE) return true;
    return false;
  };

  return (
    <AccountDetailsStyled>
      <LeftContent shouldBeGrey={shouldBeGrey}>
        <h4 data-cy="account-detail-account-title" id={account.id}>
          {account.title}
        </h4>
        <HeaderMeta shouldBeGrey={shouldBeGrey}>
          <p>Inclusive Dates: {getInclusiveDates()}</p>
          <StatusBadge status={status} />
        </HeaderMeta>
      </LeftContent>

      <RightContent>
        <MessageCounts>
          <IconTextStack
            shouldBeGrey={shouldBeGrey}
            icon={faEnvelope}
            item={formatNumber(account.messages_in_account)}
            data-cy="messages_in_account"
          />
          <IconTextStack
            shouldBeGrey={shouldBeGrey}
            icon={faFileAlt}
            item={formatNumber(account.files_in_account)}
            data-cy="files_in_account"
          />
        </MessageCounts>

        <ProcessingStatus shouldBeGrey={shouldBeGrey}>
          <h5>{getUnprocessedAmount()} Unprocessed</h5>
          <p>Last Modified {dateToIso(account.account_last_modified)}</p>
        </ProcessingStatus>
        <DotMenuStyled
          hidden={getHiddenStatus()}
          actions={actions}
          data-cy="account-detail-dot-menu"
        />
      </RightContent>
    </AccountDetailsStyled>
  );
};

const AccountDetailsStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h4 {
    max-width: 90%;
    color: ${props => (props.shouldBeGrey ? colorBlackLight : colorBlack)};
    margin: 0.5rem 0;
  }
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 35%;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const MessageCounts = styled.div`
  margin-right: 6rem;
  font-weight: lighter;
  color: ${props => (props.shouldBeGrey ? colorBlackLight : colorBlack)};
  align-content: center;
`;

const ProcessingStatus = styled.div`
  margin-right: 6rem;
  h5 {
    margin: 0;
    margin-bottom: 1rem;
  }

  h5,
  p {
    color: ${props => (props.shouldBeGrey ? colorBlackLight : colorBlack)};
  }
`;

const IconTextStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  min-width: 6.5rem;
  span {
    color: ${props => (props.shouldBeGrey ? colorBlackLight : colorBlack)};
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const IconStyled = styled(FontAwesomeIcon)`
  color: ${props => (props.shouldBeGrey ? colorBlackLight : colorBlack)};
  font-size: 2rem;
  margin-right: 1rem;
`;

const DotMenuStyled = styled(DotMenu)`
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  align-self: center;
`;

export default AccountDetails;
