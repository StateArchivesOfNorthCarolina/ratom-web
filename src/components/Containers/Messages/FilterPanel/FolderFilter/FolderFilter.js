import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { colorPrimary } from '../../../../../styles/styleVariables';

// Utils
import { isEmpty } from '../../../../../util/isEmpty';

// Context
import { AccountContext } from '../../MessagesMain';

// Components
import { FilterPanelItem } from '../FilterPanelItem';
import AddFolderModal from './AddFolderModal/AddFolderModal';
import FolderItem from './FolderItem';

function getCommonPathFromBuckets(buckets) {
  const initialDirectories = buckets.map(bck => bck.key);
  const directories = initialDirectories.concat().sort();
  const b1 = directories[0];
  const b2 = directories[directories.length - 1];
  const len = b1.length;
  let i = 0;
  while (i < len && b1.charAt(i) === b2.charAt(i)) i++;
  return b1.substring(0, i);
}

const FolderFilter = ({ buildQuery, filterQuery }) => {
  const { facets } = useContext(AccountContext);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [commonPath, setCommonPath] = useState();

  useEffect(() => {
    const cp = isEmpty(facets)
      ? []
      : getCommonPathFromBuckets(facets._filter_directory.directory.buckets);
    setCommonPath(cp);
  }, [facets]);

  const addFolders = folders => {
    buildQuery({ ...filterQuery, folders });
    setShowAddFolderModal(false);
  };

  const handleRemoveFolder = folder => {
    const folders = [...filterQuery.folders];
    const folderLoc = folders.indexOf(folder);
    folders.splice(folderLoc, 1);
    buildQuery({
      ...filterQuery,
      folders
    });
  };

  const getAggFromFacets = folder => {
    const bucket = facets._filter_directory.directory.buckets.find(bckt => bckt.key === folder);
    return bucket.doc_count;
  };

  return (
    <>
      <FolderFilterStyled>
        <h3>Folders</h3>
        {filterQuery &&
          filterQuery.folders.map(folder => {
            const shortName = folder.replace(commonPath, '');
            const agg = getAggFromFacets(folder);
            const folderWithShortname = { ...folder, agg, shortName };
            return (
              <FolderItem
                key={folder}
                folder={folderWithShortname}
                removeFolder={handleRemoveFolder}
              />
            );
          })}
        <AddFoldersButton onClick={() => setShowAddFolderModal(true)}>Add Folders</AddFoldersButton>
      </FolderFilterStyled>
      <AddFolderModal
        closeModal={() => setShowAddFolderModal(false)}
        isVisible={showAddFolderModal}
        addFolders={addFolders}
        commonPath={commonPath}
      />
    </>
  );
};

const FolderFilterStyled = styled(FilterPanelItem)``;

const AddFoldersButton = styled.button`
  margin-top: 1rem;
  border: none;
  background: none;
  color: ${colorPrimary};
  font-size: 1.5rem;
  cursor: pointer;
`;

export default FolderFilter;
