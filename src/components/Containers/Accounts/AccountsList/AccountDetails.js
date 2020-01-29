import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileAlt } from '@fortawesome/free-regular-svg-icons';

// Util
import { formatNumber } from '../../../../util/formatNumber';
import dateToIso from '../../../../util/dateToIso';
import { colorBlackLight, colorBlack } from '../../../../styles/styleVariables';
import Badge from '../../Messages/Badge';

export const STATUSES = {
  CR: 'Created',
  IM: 'Importing',
  CM: 'Complete',
  FA: 'Failed'
};

const IconTextStack = ({ item, ...props }) => {
  return (
    <IconTextStyled {...props}>
      <IconStyled {...props} /> <span>{item}</span>
    </IconTextStyled>
  );
};

const AccountDetails = ({ account, setAccount, asHeader }) => {
  const [status, setStatus] = useState();
  const [shouldBeGrey, setShouldBeGrey] = useState(false);
  const { account_status } = account;

  useEffect(() => {
    setStatus(STATUSES[account_status]);
  }, [account_status]);

  useEffect(() => {
    setShouldBeGrey(asHeader || status === 'Importing' || status === 'Failed');
  }, [asHeader, status]);

  const getInclusiveDates = () => {
    const start = dateToIso(account.inclusive_dates[0]);
    const end = dateToIso(account.inclusive_dates[1]);
    return `${start} - ${end}`;
  };

  const getUnprocessedAmount = () => {
    const diff = parseInt(account.messages_in_account) - parseInt(account.processed_messages);
    return formatNumber(diff);
  };

  const renderBadge = () => {
    let badgeStatus;
    if (asHeader) return null;
    if (status === 'Created') return null;
    if (status === 'Importing') badgeStatus = 'normal';
    if (status === 'Complete') badgeStatus = 'positive';
    if (status === 'Failed') badgeStatus = 'caution';
    return <Badge name={status} type={badgeStatus} />;
  };

  return (
    <AccountDetailsStyled>
      <LeftContent shouldBeGrey={shouldBeGrey}>
        <h4>{account.title}</h4>
        <HeaderMeta shouldBeGrey={shouldBeGrey}>
          <p>Inclusive Dates: {getInclusiveDates()}</p>
          <div>{renderBadge()}</div>
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
        <DotMenu
          onClick={setAccount ? () => setAccount(account) : undefined}
          visible={status !== 'Importing'}
        >
          . . .
        </DotMenu>
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

const DotMenu = styled.p`
  cursor: pointer;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export default AccountDetails;
