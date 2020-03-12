import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

// Context
import { AccountContext } from '../../MessagesMain';

// Util
import { isEmpty } from '../../../../../util/isEmpty';

// children
import Radio from '../../../../Components/Inputs/Radio';
import { FilterPanelItem } from '../FilterPanelItem';
import formatNumber from '../../../../../util/formatNumber';

export const ALL = 'All';
export const OPEN = 'Open';
export const RESTRICTED = 'Restricted';
export const NEEDS_REDACTION = 'Needs redaction';
export const NON_RECORD = 'Non-record';

const RecordStatusFilter = () => {
  const { setFilterQuery, filterQuery, facets } = useContext(AccountContext);
  const { recordStatus } = filterQuery;
  const [selected, setSelected] = useState(recordStatus);
  const [statusFacets, setStatusFacets] = useState({
    [OPEN]: 0,
    [RESTRICTED]: 0,
    [NEEDS_REDACTION]: 0,
    [NON_RECORD]: 0
  });

  useEffect(() => {
    if (!isEmpty(facets)) {
      console.log('facets! ', facets);
      const {
        _filter_processed,
        _filter_is_restricted,
        _filter_needs_redaction,
        _filter_is_record
      } = facets;

      const newStatusFacets = { ...statusFacets };
      const processedBucket = _filter_processed.processed.buckets.find(
        b => b.key_as_string === 'true'
      );
      const restrictedBucket = _filter_is_restricted.is_restricted.buckets.find(
        b => b.key_as_string === 'true'
      );
      const redactedBucket = _filter_needs_redaction.needs_redaction.buckets.find(
        b => b.key_as_string === 'true'
      );
      const nonrecordBucket = _filter_is_record.is_record.buckets.find(
        b => b.key_as_string === 'false'
      );

      if (processedBucket) newStatusFacets[OPEN] = processedBucket.doc_count;

      if (restrictedBucket) {
        newStatusFacets[RESTRICTED] = restrictedBucket.doc_count;
        if (newStatusFacets[OPEN] >= 0) newStatusFacets[OPEN] -= restrictedBucket.doc_count;
      }

      if (redactedBucket) {
        newStatusFacets[NEEDS_REDACTION] = redactedBucket.doc_count;
        if (newStatusFacets[OPEN] >= 0) newStatusFacets[OPEN] -= redactedBucket.doc_count;
      }

      if (nonrecordBucket) newStatusFacets[NON_RECORD] = nonrecordBucket.doc_count;

      setStatusFacets(newStatusFacets);
    }
  }, [facets]);

  const options = [
    { name: ALL, accessor: ALL },
    { name: OPEN, accessor: OPEN, extra: formatNumber(statusFacets[OPEN]) },
    { name: RESTRICTED, accessor: RESTRICTED, extra: formatNumber(statusFacets[RESTRICTED]) },
    {
      name: NEEDS_REDACTION,
      accessor: NEEDS_REDACTION,
      extra: formatNumber(statusFacets[NEEDS_REDACTION])
    },
    { name: NON_RECORD, accessor: NON_RECORD, extra: formatNumber(statusFacets[NON_RECORD]) }
  ];

  const handleChange = e => {
    setSelected(e.target.value);
    setFilterQuery({
      ...filterQuery,
      recordStatus: e.target.value
    });
  };

  return (
    <RecordStatusFilterStyled data-cy="record_status_filter">
      <h3>Record status</h3>
      <RadioStyled
        options={options}
        selected={selected}
        name="recordStatus"
        onChange={handleChange}
      />
    </RecordStatusFilterStyled>
  );
};

const RecordStatusFilterStyled = styled(FilterPanelItem)`
  display: flex;
  flex-direction: column;
  height: 25rem;

  h3 {
    margin-bottom: 1.5rem;
  }
`;

const RadioStyled = styled(Radio)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
`;

export default RecordStatusFilter;
