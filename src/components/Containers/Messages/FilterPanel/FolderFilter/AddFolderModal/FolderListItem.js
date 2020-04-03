import React from 'react';
import styled from 'styled-components';
import { colorBlack, colorWhite, colorGrey } from '../../../../../../styles/styleVariables';
import { darken } from '../../../../../../styles/styleUtils/lighten-darken';

// Children
import MessageCheckbox from '../../../MessagesContent/MessagesList/MessageListItem/MessageCheckbox';

const FolderListItem = ({ folder, selected, onSelect, i }) => {
  const splitPath = folder.shortName.split('/');
  const lowestFolder = splitPath[splitPath.length - 1];
  const pathRoot = folder.shortName.replace(lowestFolder, '');
  const renderPath = () => {
    return (
      <ItemFolder>
        <ItemRoot>
          {pathRoot}
          <span>{lowestFolder}</span>
        </ItemRoot>{' '}
        <ItemAgg>({folder.doc_count})</ItemAgg>
      </ItemFolder>
    );
  };
  return (
    <FolderListItemStyled alternate={i !== false} odd={i % 2 === 0}>
      <Checkbox
        label={renderPath()}
        wrapperStyles={{ flex: 1, padding: '1.5rem 1rem', margin: 0, height: 'auto' }}
        checked={selected}
        onChange={e => onSelect(e, folder.key)}
      />
    </FolderListItemStyled>
  );
};

const FolderListItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  background-color: ${props => (props.odd && props.alternate ? colorGrey : colorWhite)};
  &:hover {
    background-color: ${props =>
      props.odd && props.alternate ? darken(colorGrey, 3) : darken(colorWhite, 3)};
  }
`;

const Checkbox = styled(MessageCheckbox)``;

const ItemFolder = styled.p`
  display: flex;
  flex-direction: row;
`;

const ItemRoot = styled.span`
  flex: 1;
  font-weight: lighter;
  span {
    font-weight: bold;
    color: ${colorBlack};
  }
`;

const ItemAgg = styled.span`
  margin-left: 0.5rem;
`;

export default FolderListItem;
