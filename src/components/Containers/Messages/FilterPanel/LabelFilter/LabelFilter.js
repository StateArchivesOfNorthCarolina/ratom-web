import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

// Deps
import Autosuggest from 'react-autosuggest';

// Components
import { AccountContext } from '../../MessagesMain';
import { FilterPanelItem } from '../FilterPanelItem';
import { Badge, AutoCompleteBadge } from '../../../../Components/Labels/Badge';
import AutoSuggestInput from './AutoSuggestInput';
import AutoSuggestionContainer from './AutoSuggestionContainer';

const renderSuggestion = (suggestion, { isHighlighted }) => {
  return (
    <SuggestionStyled>
      <AutoCompleteBadge {...suggestion} isHighlighted={isHighlighted} />
    </SuggestionStyled>
  );
};

const LabelFilter = ({ buildQuery, filterQuery, sendQuery, ...props }) => {
  const [searchLabels, setSearchLabels] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const { account } = useContext(AccountContext);

  const { labels } = filterQuery;

  const handleHotKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Backspace' && e.shiftKey) removeLabel();
    if (e.key === 'Enter' && e.shiftKey) sendQuery();
  };

  const handleSuggestionChange = (_, { newValue }) => {
    setSuggestionValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let availableLabels = [...searchLabels];
    availableLabels = availableLabels.filter(
      thisLabel => !labels.map(innerLabel => innerLabel.name).includes(thisLabel.name)
    );
    return inputLength === 0
      ? []
      : availableLabels.filter(
          thisLabel => thisLabel.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const handleSuggestionSelected = (_, { suggestion }) => {
    addLabel(suggestion);
  };

  const addLabel = thisLabel => {
    setSuggestionValue('');
    buildQuery({
      ...filterQuery,
      labels: [...filterQuery.labels, thisLabel]
    });
  };

  const removeLabel = thisLabel => {
    const theseLabels = filterQuery.labels.slice();
    if (thisLabel) {
      const { name } = thisLabel;
      const labelLoc = filterQuery.labels.map(innerLabel => innerLabel.name).indexOf(name);
      theseLabels.splice(labelLoc, 1);
      buildQuery({
        ...filterQuery,
        labels: theseLabels
      });
    } else {
      theseLabels.pop();
      buildQuery({
        ...filterQuery,
        labels: theseLabels
      });
    }
  };

  useEffect(() => {
    if (account) {
      setSearchLabels(account.labels);
    }
  }, [account]);

  const inputProps = {
    value: suggestionValue,
    onChange: handleSuggestionChange,
    onKeyUp: handleHotKeyPressed
  };

  return (
    <LabelFilterStyled {...props} data-cy="label_filter">
      <h3>Labels</h3>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={handleSuggestionSelected}
        highlightFirstSuggestion
        renderInputComponent={AutoSuggestInput}
        renderSuggestionsContainer={AutoSuggestionContainer}
      />
      <BadgesListStyled data-cy="label_list">
        {labels.map((thisLabel, i) => (
          <Badge
            {...thisLabel}
            key={`${i}_${thisLabel.name}`}
            remove={() => removeLabel(thisLabel)}
            data-cy="label_item"
          />
        ))}
      </BadgesListStyled>
    </LabelFilterStyled>
  );
};

const LabelFilterStyled = styled(FilterPanelItem)``;

const SuggestionStyled = styled.div``;

const BadgesListStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export default LabelFilter;
