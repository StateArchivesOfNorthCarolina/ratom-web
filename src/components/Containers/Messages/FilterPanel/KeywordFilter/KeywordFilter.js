import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import { FilterPanelItem } from '../FilterPanelItem';
import Input from '../../../../Components/Inputs/Input';

// Children
import Keyword from './Keyword';

const KeywordFilter = ({ buildQuery, filterQuery, sendQuery, ...props }) => {
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
    <KeywordFilterStyled {...props} data-cy="keyword_search">
      <h3>Keywords</h3>
      <Input
        data-cy="keyword_search_input"
        type="text"
        icon="add"
        onIconClick={addKeyword}
        onKeyDown={handleDeleteKeyPressed}
        onChange={e => setKeyword(e.target.value)}
        value={keyword}
      />
      <BadgesListStyled data-cy="keyword_list">
        {keywords.map((keyword, i) => {
          let name = keyword;
          if (keyword.name) name = keyword.name;
          return <Keyword name={name} key={`${i}_${name}`} remove={() => removeKeyword(name)} />;
        })}
      </BadgesListStyled>
    </KeywordFilterStyled>
  );
};

const KeywordFilterStyled = styled(FilterPanelItem)``;

const BadgesListStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export default KeywordFilter;
