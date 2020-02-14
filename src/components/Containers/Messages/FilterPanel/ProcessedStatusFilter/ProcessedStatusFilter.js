import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

// Context
import { AccountContext } from '../../MessagesMain';

// Utils
import { formatNumber } from '../../../../../util/formatNumber';

// Children
import { FilterPanelItem } from '../FilterPanelItem';
import Radio from '../../../../Components/Inputs/Radio';

const ALL = 'All';
const PROCESSED = 'Processed';
const UNPROCESSED = 'Unprocessed';

const ProcessedStatusFilter = props => {
  const { setFilterQuery, filterQuery, facets } = useContext(AccountContext);
  const { processedStatus } = filterQuery;
  const [selected, setSelected] = useState(processedStatus);
  const [processedFacets, setProcessedFacets] = useState({
    [PROCESSED]: 0,
    [UNPROCESSED]: 0
  });

  const options = [
    { name: ALL, accessor: ALL },
    { name: PROCESSED, accessor: PROCESSED, extra: formatNumber(processedFacets[PROCESSED]) },
    { name: UNPROCESSED, accessor: UNPROCESSED, extra: formatNumber(processedFacets[UNPROCESSED]) }
  ];

  const handleChange = e => {
    setSelected(e.target.value);
    setFilterQuery({
      ...filterQuery,
      processedStatus: e.target.value
    });
  };

  useEffect(() => {
    if (facets && facets._filter_processed) {
      const processedFacetsIncoming = facets._filter_processed.processed.buckets;
      const newProcessedFacets = { ...processedFacets };
      for (let i = 0; i < processedFacetsIncoming.length; i++) {
        const facet = processedFacetsIncoming[i];
        if (facet.key_as_string === 'false') newProcessedFacets.Unprocessed = facet.doc_count;
        if (facet.key_as_string === 'true') newProcessedFacets.Processed = facet.doc_count;
      }
      setProcessedFacets(newProcessedFacets);
    }
  }, [facets._filter_processed]);

  return (
    <ProcessedStatusFilterStyled data-cy="processed_status_widget">
      <h3>Message processed status</h3>
      <RadioStyled
        options={options}
        selected={selected}
        name="messageProcessed"
        onChange={handleChange}
      />
    </ProcessedStatusFilterStyled>
  );
};

const ProcessedStatusFilterStyled = styled(FilterPanelItem)`
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 1.5rem;
  }
`;

const RadioStyled = styled(Radio)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export default ProcessedStatusFilter;
