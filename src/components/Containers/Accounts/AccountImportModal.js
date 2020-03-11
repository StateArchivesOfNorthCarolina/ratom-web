import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { colorBlackLight } from '../../../styles/styleVariables';

// Context
import { AccountsContext } from './AccountsMain';

// Axios
import Axios from '../../../services/axiosConfig';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from '../../../services/requests';

// Deps
import { useAlert } from 'react-alert';

// Hooks
import useKeyPress from '../../Hooks/useKeyPress';

// Children
import AnimatedModal from '../../Components/Animated/AnimatedModal';
import Logo from '../../Components/Logo';
import CloseButton from '../../Components/Buttons/CloseButton';
import Input from '../../Components/Inputs/Input';
import TextArea from '../../Components/Inputs/TextArea';
import Button from '../../Components/Buttons/Button';

const AccountImportModal = ({ closeModal, isVisible }) => {
  const { accountSelected, selectAccount } = useContext(AccountsContext);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  // const [description, setDescription] = useState();
  const [filename, setFilename] = useState();
  useKeyPress('Escape', () => {
    setLoading(false);
    setTitle('');
    // setDescription('');
    setFilename('');
    selectAccount();
    closeModal();
  });

  const _createAccount = account => {
    setLoading(true);
    Axios.post(CREATE_ACCOUNT, account)
      .then(response => {
        alert.success(
          `${title} has been created, and ${filename} is being imported. Check the Accounts List for progress updates.`
        );
        closeImportModal();
      })
      .catch(error => {
        setLoading(false);
        // This is an error in intial creation of Account, not in import process
        // TODO: What's in error? Would be nice to give the Account title in the alert
        alert.show('An error occured while trying to create this account.', {
          type: 'error'
        });
      });
  };

  const _updateAccount = account => {
    setLoading(true);
    Axios.put(`${UPDATE_ACCOUNT}${accountSelected.id}/`, account)
      .then(response => {
        alert.success(
          `${filename} is being imported. Check the Accounts List for progress updates.`
        );
        closeImportModal();
      })
      .catch(error => {
        setLoading(false);
        // This is an error in intial creation of Account, not in import process
        // TODO: What's in error? Would be nice to give the Account title in the alert
        alert.show('An error occured while trying to add a file to this account.', {
          type: 'error'
        });
      });
  };

  const getImportDisabled = () => {
    // TODO: can possibly do a bit more validation here once we know how this is reall going to work
    return loading || (accountSelected ? !filename : !title || !filename);
  };

  const handleImportAccount = () => {
    // TODO: Do the importing business here
    if (accountSelected) _updateAccount({ filename });
    else _createAccount({ title, filename });
  };

  const closeImportModal = () => {
    setLoading(false);
    setTitle('');
    // setDescription('');
    setFilename('');
    selectAccount();
    closeModal();
  };

  return (
    <AccountImportModalStyled closeModal={closeImportModal} isVisible={isVisible}>
      <ModalHeader>
        <Logo />
        <CloseButton onClick={closeImportModal} />
      </ModalHeader>
      <ModalBody>
        {accountSelected ? (
          <h1>
            Add a new file to <span>{accountSelected.title}</span>
          </h1>
        ) : (
          <h1>Create a new account</h1>
        )}
        <FormStyled>
          <FormInner>
            {!accountSelected && (
              <div>
                <Input
                  label="Name the account"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
            )}
            <div>
              <Input
                label="Enter the name of the file to import"
                value={filename}
                onChange={e => setFilename(e.target.value)}
              />
            </div>
          </FormInner>
          <ButtonStyled positive disabled={getImportDisabled()} onClick={handleImportAccount}>
            Import File
          </ButtonStyled>
        </FormStyled>
      </ModalBody>
    </AccountImportModalStyled>
  );
};

const AccountImportModalStyled = styled(AnimatedModal)`
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  padding: 4rem;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
`;

const ModalBody = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    span {
      color: ${colorBlackLight};
    }
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`;

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;

  & > div {
    width: 50rem;
    &:not(:last-child) {
      margin-bottom: 5rem;
    }
  }
`;

const ButtonStyled = styled(Button)`
  width: fit-content;
  align-self: flex-end;
  margin: 4rem;
`;

export default AccountImportModal;
