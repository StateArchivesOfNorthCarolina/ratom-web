import React from 'react';
import styled from 'styled-components';
import { colorPrimary, colorBlack, colorBlackLight } from '../../../../../styles/styleVariables';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const FolderItem = ({ folder, removeFolder }) => {
  const splitPath = folder.shortName.split('/');
  const lowestFolder = splitPath[splitPath.length - 1];
  const pathRoot = folder.shortName.replace(lowestFolder, '');

  return (
    <FolderItemStyled>
      <p>
        {pathRoot}
        <ItemFolder>{lowestFolder}</ItemFolder> <ItemAgg>({folder.agg})</ItemAgg>
      </p>
      <ItemClose icon={faTimesCircle} onClick={() => removeFolder(folder.key)} />
    </FolderItemStyled>
  );
};

const FolderItemStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;

  p {
    flex: 1;
    color: ${colorBlack};
    font-weight: lighter;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    text-align: left;
  }
`;

const ItemFolder = styled.span`
  font-weight: bold;
  /* color: ${colorBlackLight}; */
`;

const ItemAgg = styled.span`
  margin-left: 0.5rem;
`;

const ItemClose = styled(FontAwesomeIcon)`
  color: ${colorPrimary};
  margin-left: 0.5rem;
  cursor: pointer;
`;

export default FolderItem;
