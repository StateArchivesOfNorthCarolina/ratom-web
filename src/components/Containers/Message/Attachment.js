import React from 'react';
import styled from 'styled-components';
import { colorPrimary } from '../../../styles/styleVariables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

const Attachment = ({ attachment }) => {
  return (
    <AttachmentStyled>
      <Icon icon={faPaperclip} />
      <p>{attachment.file_name}</p>
    </AttachmentStyled>
  );
};

const AttachmentStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    color: ${colorPrimary};
    margin-left: 1rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25rem;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${colorPrimary};
`;

export default Attachment;
