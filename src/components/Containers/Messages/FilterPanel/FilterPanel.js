import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

// Children
import KeywordFilter from './KeywordFilter/KeywordFilter';
import FilterActions from './FilterActions';

// Context
import { AccountContext } from '../MessagesMain';

// Components
import ScrollShadow from '../../../Components/ScrollShadow';

// Children
import ProcessedStatusFilter from './ProcessedStatusFilter/ProcessedStatusFilter';
import RecordStatusFilter from './RecordStatusFilter/RecordStatusFilter';
import EmailFilter from './EmailFilter/EmailFilter';
import DateRangeFilter from './DateRangeFilter/DateRangeFilter';
import LabelFilter from './LabelFilter/LabelFilter';

const FilterPanel = () => {
  const { setQuery, filterQuery, setFilterQuery } = useContext(AccountContext);

  const sendQuery = () => {
    setQuery(filterQuery);
    // searchMessages();
  };

  return (
    <FilterPanelStyled>
      <FiltersWrapper>
        <ScrollShadow position="top" innerWidth="26rem" />
        <KeywordFilter
          buildQuery={setFilterQuery}
          filterQuery={filterQuery}
          sendQuery={sendQuery}
        />
        <LabelFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
        <ProcessedStatusFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
        <RecordStatusFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
        <EmailFilter buildQuery={setFilterQuery} filterQuery={filterQuery} sendQuery={sendQuery} />
        <DateRangeFilter buildQuery={setFilterQuery} filterQuery={filterQuery} />
        <ScrollShadow position="bottom" innerWidth="26rem" />
      </FiltersWrapper>
      <ActionsWrapper>
        <FilterActions sendQuery={sendQuery} />
      </ActionsWrapper>
    </FilterPanelStyled>
  );
};

const FilterPanelStyled = styled.aside`
  width: 26rem;
  height: auto;

  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const FiltersWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 2rem 0;
`;

const ActionsWrapper = styled.div`
  border-top: ${borderSeparator};
`;

export default FilterPanel;
