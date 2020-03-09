import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { colorPrimary, colorGrey } from '../../../styles/styleVariables';

// Deps
import { useParams } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

// Context
import { AccountContext } from '../../Containers/Messages/MessagesMain';

// Axios
import Axios from '../../../services/axiosConfig';
import { SHOW_ACCOUNT } from '../../../services/requests';

// Components
import AutoSuggestionContainer from '../../Containers/Messages/FilterPanel/LabelFilter/AutoSuggestionContainer';
import ClickableOverlay from '../ClickableOverlay';
import Spinner from '../Loading/Spinner';

// Constants
const PREVENT_ADD_NLP_TAGS = true;
const LABEL_INPUT_MAX_LENGTH = 45;

const renderSuggestion = (suggestion, { isHighlighted }) => {
  return (
    <SuggestionStyled isHighlighted={isHighlighted}>
      <p>{suggestion.name}</p>
    </SuggestionStyled>
  );
};

const AutoSuggestInput = inputProps => {
  return (
    <InputWrapper>
      <InputStyled
        maxLength={LABEL_INPUT_MAX_LENGTH}
        data-cy="add_label_input"
        autoFocus
        {...inputProps}
      />
    </InputWrapper>
  );
};

const AddLabel = ({ currentLabels, handleAddLabel, labelLoading }) => {
  const { accountId } = useParams();
  const { account } = useContext(AccountContext);
  const [showInput, setShowInput] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchLabels, setSearchLabels] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!account) {
      Axios.get(`${SHOW_ACCOUNT}${accountId}/`).then(response => {
        const userLabels = getUserGeneratedLabels(response.data.labels);
        setSearchLabels(userLabels);
      });
    } else {
      setSearchLabels(account.labels);
    }
  }, [account]);

  const getUserGeneratedLabels = allLabels => {
    return allLabels.filter(l => l.type === 'U');
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSuggestionChange = (_, { newValue }) => {
    setInputValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = value => {
    const val = value.trim().toLowerCase();
    const inputLength = val.length;
    let availableLabels = [...searchLabels];
    availableLabels = availableLabels.filter(
      thisLabel => !currentLabels.map(innerLabel => innerLabel.name).includes(thisLabel.name)
    );
    if (PREVENT_ADD_NLP_TAGS) {
      availableLabels = availableLabels.filter(thisLabel => thisLabel.type === 'U');
    }
    return inputLength === 0
      ? []
      : availableLabels.filter(
          thisLabel => thisLabel.name.toLowerCase().slice(0, inputLength) === val
        );
  };

  const handleSuggestionSelected = (_, { suggestion }) => {
    addNewLabel(suggestion);
  };

  const addNewLabel = thisLabel => {
    setInputValue('');
    setShowInput(false);
    handleAddLabel(thisLabel);
  };

  const handleHotKeyPressed = e => {
    e.stopPropagation();
    if (e.target.value && e.key === 'Enter') {
      addNewLabel({
        type: 'U',
        name: inputValue.trim()
      });
    }
  };

  const handleCloseAddLabel = () => {
    setShowInput(false);
    setInputValue('');
  };

  const inputProps = {
    value: inputValue,
    onChange: handleSuggestionChange,
    onKeyUp: handleHotKeyPressed
  };

  if (labelLoading) {
    return <Spinner small />;
  }

  return (
    <AddLabelStyled>
      {showInput ? (
        <>
          <AutoInputWrapper>
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
            <CloseButtonWrapper onClick={handleCloseAddLabel}>
              <CloseButton>x</CloseButton>
            </CloseButtonWrapper>
          </AutoInputWrapper>
          <ClickableOverlay onClick={() => setShowInput(false)} open={showInput} />
        </>
      ) : (
        <AddLabelButton onClick={handleShowInput} data-cy="add_label_button">
          + Add Label
        </AddLabelButton>
      )}
    </AddLabelStyled>
  );
};

const AddLabelStyled = styled.div`
  margin: 0 2px 2px 0;
`;

const AddLabelButton = styled.p`
  color: ${colorPrimary};
  cursor: pointer;
`;

const SuggestionStyled = styled.div`
  background-color: ${props => (props.isHighlighted ? colorGrey : 'transparent')};
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;
`;

const InputStyled = styled.input`
  height: 2rem;
  width: 18rem;
  font-size: 1rem;
  padding: 0.5rem 1.5rem 0.5rem 1rem;
`;

const AutoInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CloseButtonWrapper = styled.div`
  z-index: 10;
  position: absolute;
  right: 5px;
  cursor: pointer;
`;

const CloseButton = styled.p``;

export default AddLabel;
