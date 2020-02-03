import React from 'react';
import styled from 'styled-components';

const TextArea = ({ label, onEnterKey, ...props }) => {
  return (
    <FieldSetStyled {...props}>
      <LabelStyled>{label}</LabelStyled>
      <TextAreaStyled {...props} />
    </FieldSetStyled>
  );
};

const FieldSetStyled = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
  }
`;

const LabelStyled = styled.label`
  margin-bottom: 1rem;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colorGrey};
  resize: none;
`;

export default TextArea;
