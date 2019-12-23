import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// Components
import { FilterPanelItem } from './FilterPanelItem';
import Input from '../../../Components/Inputs/Input';

// Children
import BadgesList from './BadgesList';

// Context
import { CollectionContext } from '../MessagesMain';

const SearchKeywords = props => {
  const [keyword, setKeyword] = useState('');
  const { query, setQuery, queryMessages } = useContext(CollectionContext);

  const { keywords } = query;

  const handleKeyPressed = e => {
    // e.preventDefault();
    e.stopPropagation();
    if (e.key === 'Enter' && e.shiftKey) {
      queryMessages();
    } else if (e.key === 'Enter') {
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (keyword.trim()) {
      setKeyword('');
      setQuery({
        ...query,
        keywords: [...query.keywords, keyword]
      });
    }
  };

  const removeKeyword = keyword => {
    const keywordLoc = query.keywords.indexOf(keyword);
    const keywords = query.keywords.slice();
    keywords.splice(keywordLoc, 1);
    setQuery({
      ...query,
      keywords
    });
  };

  return (
    <SearchKeywordsStyled {...props}>
      <Input
        type="text"
        icon="search"
        label="Keyword Search"
        onKeyPress={handleKeyPressed}
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
      />
      <BadgesList badges={keywords} onRemoveBadge={removeKeyword} />
    </SearchKeywordsStyled>
  );
};

const SearchKeywordsStyled = styled(FilterPanelItem)``;

export default SearchKeywords;
