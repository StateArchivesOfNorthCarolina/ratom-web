import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { boxShadow, borderSeparator, colorPrimary } from '../../../../../../styles/styleVariables';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

// Components
import AnimatedModal from '../../../../../Components/Animated/AnimatedModal';
import { AccountContext } from '../../../MessagesMain';
import Button from '../../../../../Components/Buttons/Button';
import FolderListItem from './FolderListItem';
import ScrollShadow from '../../../../../Components/ScrollShadow';
import CloseButton from '../../../../../Components/Buttons/CloseButton';

const sortPaths = (pA, pB) => pA - pB || pA.length - pB.length;

const AddFolderModal = ({ closeModal, isVisible, addFolders, commonPath }) => {
  const { account, facets, filterQuery } = useContext(AccountContext);
  const [checkedFolders, setCheckedFolders] = useState(filterQuery.folders);

  useEffect(() => {
    setCheckedFolders(filterQuery.folders);
  }, [filterQuery.folders]);

  const handleCheckFolder = (e, folder) => {
    const { checked } = e.target;
    const folders = [...checkedFolders];
    if (checked) folders.push(folder);
    else {
      const folderLoc = checkedFolders.indexOf(folder);
      folders.splice(folderLoc, 1);
    }
    setCheckedFolders(folders);
  };

  const handleAddFolders = () => {
    addFolders(checkedFolders);
  };

  return (
    <AddFolderModalStyled closeModal={closeModal} isVisible={isVisible}>
      <ModalHeader>
        <ModalHeaderInner>
          <div>
            <FolderIcon icon={faFolder} />
            <h2>Add Folders to Filter</h2>
          </div>
          {commonPath && <CommonPath data-cy="root_path">Root path: {commonPath}</CommonPath>}
        </ModalHeaderInner>
        <CloseButton onClick={closeModal} small />
      </ModalHeader>
      <ModalFolders>
        <ScrollShadow position="top" innerWidth="100%" />
        {account &&
          facets &&
          account.paths.sort(sortPaths).map((fullPath, i) => {
            const shortName = fullPath.replace(commonPath, '');
            const bucket = facets._filter_directory.directory.buckets.find(
              bckt => bckt.key === fullPath
            );
            const agg = bucket ? bucket.doc_count : 0;
            const folderWithShortname = { fullPath, shortName, agg };
            return (
              <FolderListItem
                i={facets._filter_directory.directory.buckets.length > 1 ? i : false}
                key={fullPath}
                folder={folderWithShortname}
                selected={checkedFolders.includes(fullPath)}
                onSelect={handleCheckFolder}
              />
            );
          })}

        <ScrollShadow position="bottom" innerWidth="100%" />
      </ModalFolders>
      <ModalActions>
        <Button neutral onClick={closeModal}>
          Cancel
        </Button>
        <AddButton data-cy="select_folders_button" positive onClick={handleAddFolders}>
          Add
        </AddButton>
      </ModalActions>
    </AddFolderModalStyled>
  );
};

const AddFolderModalStyled = styled(AnimatedModal)`
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: auto;
  box-shadow: ${boxShadow};

  min-width: 60vw;

  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${borderSeparator};
  padding: 2rem 4rem;
`;

const ModalHeaderInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    h2 {
      margin: 0 0 0 2rem;
    }
  }
`;

const CommonPath = styled.p``;

const FolderIcon = styled(FontAwesomeIcon)`
  color: ${colorPrimary};
  font-size: 3.5rem;
`;

const ModalFolders = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  max-height: 70vh;
  overflow-y: scroll;
`;

const ModalActions = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 2rem 4rem;
  justify-content: flex-end;

  border-top: ${borderSeparator};

  button:last-child {
    margin-left: 5rem;
  }
`;

const AddButton = styled(Button)`
  min-width: 10rem;
`;

export default AddFolderModal;
