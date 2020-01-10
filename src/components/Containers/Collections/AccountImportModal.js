import React, { useState } from 'react';
import styled from 'styled-components';
import AnimatedModal from '../../Components/Animated/AnimatedModal';
import Logo from '../../Components/Logo';
import CloseButton from '../../Components/Buttons/CloseButton';
import Input from '../../Components/Inputs/Input';
import TextArea from '../../Components/Inputs/TextArea';
import Button from '../../Components/Buttons/Button';

const AccountImportModal = ({ closeModal, ...props }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [importDisabled, setImportDisabled] = useState(true);

  const getImportDisabled = () => {
    // TODO: can possibly do a bit more validation here once we know how this is reall going to work
    return !(name && desc && url);
  };

  const handleImportAccount = () => {
    // TODO: Do the importing business here, then:
    closeModal();
  };

  return (
    <AccountImportModalStyled {...props}>
      <ModalHeader>
        <Logo />
        <CloseButton onClick={closeModal} />
      </ModalHeader>
      <ModalBody>
        <h1>Import a new account</h1>
        <form>
          <div>
            <InputStyled
              label="Name the account"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextAreaStyled
              label="Provide a description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
          <div>
            <InputStyled
              label="Enter a URL to a .pst file"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
        </form>
        <ButtonStyled positive disabled={getImportDisabled()} onClick={handleImportAccount}>
          Import Account
        </ButtonStyled>
      </ModalBody>
    </AccountImportModalStyled>
  );
};

const AccountImportModalStyled = styled(AnimatedModal)`
  top: 0;
  left: 0;
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

  form {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 4rem;

    & > div {
      width: 50%;
    }
  }
`;

const InputStyled = styled(Input)`
  max-width: 50rem;
  margin-bottom: 2rem;
`;

const TextAreaStyled = styled(TextArea)`
  max-width: 50rem;
  min-height: 20rem;
`;

const ButtonStyled = styled(Button)`
  width: fit-content;
  align-self: flex-end;
  margin: 4rem;
`;

export default AccountImportModal;
