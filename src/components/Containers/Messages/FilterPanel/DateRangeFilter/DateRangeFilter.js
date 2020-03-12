import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// Components
import { AccountContext } from '../../MessagesMain';
import { FilterPanelItem } from '../FilterPanelItem';
import Input from '../../../../Components/Inputs/Input';
import FormErrors from '../../../../Components/Form/FormErrors';
import ActionButton from '../../../../Components/Buttons/ActionButton';

const DateRangeFilter = ({ buildQuery, filterQuery }) => {
  const { account } = useContext(AccountContext);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [originalFromDate, setOriginalFromDate] = useState();
  const [originalToDate, setOriginalToDate] = useState();
  const [error, setError] = useState();

  const isoDateFormat = 'YYYY-MM-DD';

  const formatDate = date => {
    return moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', 'YYYY/MM/DD']);
  };

  const setDates = () => {
    setError();
    const f = formatDate(fromDate);
    const t = formatDate(toDate);
    if (!f.isValid() || !t.isValid()) {
      setError('Invalid date');
    } else if (f > t) {
      const dateError = `${fromDate} is after ${toDate}`;
      setError(dateError);
    } else {
      // All should be valid now
      try {
        setError();
        setFromDate(f.format(isoDateFormat));
        setToDate(t.format(isoDateFormat));
        buildQuery({
          ...filterQuery,
          dateRange: [f.format(isoDateFormat), t.format(isoDateFormat)]
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (account && originalFromDate === undefined && originalToDate === undefined) {
      const fromTo = [
        formatDate(account.inclusive_dates[0]).format(isoDateFormat),
        formatDate(account.inclusive_dates[1]).format(isoDateFormat)
      ];
      setFromDate(fromTo[0]);
      setToDate(fromTo[1]);
      setOriginalFromDate(fromTo[0]);
      setOriginalToDate(fromTo[1]);
    }

    if (filterQuery['dateRange'].length > 0) {
      setFromDate(filterQuery['dateRange'][0]);
      setToDate(filterQuery['dateRange'][1]);
    }
  }, [account]);

  useEffect(() => {
    if (filterQuery['dateRange'].length === 0) {
      setFromDate(originalFromDate);
      setToDate(originalToDate);
    }
  }, [filterQuery]);

  return (
    <DateRangeFilterStyled data-cy="date_range_filter_input">
      <h3>From:</h3>
      <Input
        data-cy="date_from_input"
        type="text"
        placeholder="YYYY-MM-DD"
        onChange={e => setFromDate(e.target.value)}
        value={fromDate}
      />
      <h3>To:</h3>
      <Input
        data-cy="date_to_input"
        type="text"
        placeholder="YYYY-MM-DD"
        onChange={e => setToDate(e.target.value)}
        value={toDate}
      />
      <ActionButton onClick={() => setDates()} data-cy="apply_date_range_filter">
        Set Date Filter
      </ActionButton>
      <FormErrors errors={[error]} />
    </DateRangeFilterStyled>
  );
};

const DateRangeFilterStyled = styled(FilterPanelItem)``;

export default DateRangeFilter;
