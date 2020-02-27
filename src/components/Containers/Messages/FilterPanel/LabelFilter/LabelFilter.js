import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// Components
import { AccountContext } from '../../MessagesMain';
import { FilterPanelItem } from '../FilterPanelItem';
import Input from '../../../../Components/Inputs/Input';
import Label from './Label';

const LabelFilter = ({ buildQuery, filterQuery, sendQuery, ...props }) => {
  const [label, setLabel] = useState();
  const { account } = useContext(AccountContext);

  const { labels } = filterQuery;

  const handleDeleteKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Backspace' && e.shiftKey) removeLabel();
    if (e.key === 'Enter' && e.shiftKey) {
      sendQuery();
    } else if (e.key === 'Enter') {
      addLabel();
    }
  };

  const addLabel = () => {
    if (label.trim()) {
      setLabel('');
      buildQuery({
        ...filterQuery,
        labels: [...filterQuery.labels, label]
      });
    }
  };

  const removeLabel = label => {
    const labels = filterQuery.labels.slice();
    if (label) {
      const labelLoc = filterQuery.labels.indexOf(labels);
      label.splice(labelLoc, 1);
      buildQuery({
        ...filterQuery,
        labels
      });
    } else {
      labels.pop();
      buildQuery({
        ...filterQuery,
        labels
      });
    }
  };

  return (
    <LabelFilterStyled {...props} data-cy="label_filter">
      <h3>Labels</h3>
      <Input
        data-cy="label_filter_input"
        type="text"
        icon="add"
        onIconClick={addLabel}
        onKeyDown={handleDeleteKeyPressed}
        onChange={e => setLabel(e.target.value)}
        value={label}
      />
      <BadgesListStyled data-cy="label_list">
        {labels.map((keyword, i) => {
          let name = keyword;
          if (keyword.name) name = keyword.name;
          return <Label name={name} key={`${i}_${name}`} remove={() => removeLabel(name)} />;
        })}
      </BadgesListStyled>
    </LabelFilterStyled>
  );
};

const LabelFilterStyled = styled(FilterPanelItem)``;

const BadgesListStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export default LabelFilter;
