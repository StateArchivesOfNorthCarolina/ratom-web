import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import { FilterPanelItem } from './FilterPanelItem';
import Input from '../../../Components/Inputs/Input';

// Children
import BadgesList from './BadgesList';

const SearchKeywords = ({ buildQuery, filterQuery, sendQuery, ...props }) => {
  const [keyword, setKeyword] = useState('');

  const { keywords } = filterQuery;

  const handleDeleteKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Backspace' && e.shiftKey) removeKeyword();
    if (e.key === 'Enter' && e.shiftKey) {
      sendQuery();
    } else if (e.key === 'Enter') {
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (keyword.trim()) {
      setKeyword('');
      buildQuery({
        ...filterQuery,
        keywords: [...filterQuery.keywords, keyword]
      });
    }
  };

  const removeKeyword = keyword => {
    const keywords = filterQuery.keywords.slice();
    if (keyword) {
      const keywordLoc = filterQuery.keywords.indexOf(keyword);
      keywords.splice(keywordLoc, 1);
      buildQuery({
        ...filterQuery,
        keywords
      });
    } else {
      keywords.pop();
      buildQuery({
        ...filterQuery,
        keywords
      });
    }
  };

  return (
    <SearchKeywordsStyled {...props}>
      <Input
        type="text"
        icon="search"
        label="Keyword Search"
        onKeyDown={handleDeleteKeyPressed}
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
      />
      <BadgesList badges={keywords} onRemoveBadge={removeKeyword} />
    </SearchKeywordsStyled>
  );
};

const SearchKeywordsStyled = styled(FilterPanelItem)``;

export default SearchKeywords;
